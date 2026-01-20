from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Optional, List
import uvicorn
from collections import defaultdict

# Import your agent and board
from agent.program import Agent
from agent.board import BitBoard
from agent_wrapper import PlayerColor, Coord, PlaceAction

app = FastAPI(title="Tetress Agent API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sylim.vercel.app",
        "http://localhost:5173"  # for local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for API
class MoveRequest(BaseModel):
    game_id: str
    piece: str  # "I", "O", "T", "J", "L", "S", "Z"
    r: int
    c: int
    rotation: int

class GameStateResponse(BaseModel):
    board: Dict[str, Optional[str]]  # "r,c" -> "red" | "blue" | null
    current_player: str  # "red" or "blue"
    game_over: bool
    winner: Optional[str]  # "red" | "blue" | "draw" | null
    red_count: int
    blue_count: int
    turn_count: int
    valid: bool
    message: Optional[str]

class NewGameResponse(BaseModel):
    game_id: str
    board: Dict[str, Optional[str]]
    current_player: str

# Store active games in memory (use Redis/database in production)
games: Dict[str, BitBoard] = {}
agents: Dict[str, Agent] = {}

# Tetromino shapes
TETROMINOES = {
    "I": [
        [(0,0), (0,1), (0,2), (0,3)],
        [(0,0), (1,0), (2,0), (3,0)]
    ],
    "O": [
        [(0,0), (0,1), (1,0), (1,1)]
    ],
    "T": [
        [(0,0), (1,0), (2,0), (1,1)],
        [(0,0), (0,-1), (0,-2), (1,-1)],
        [(0,0), (-1,0), (-2,0), (-1,-1)],
        [(0,0), (0,1), (0,2), (-1,1)]
    ],
    "J": [
        [(0,0), (0,1), (0,2), (1,2)],
        [(0,0), (-1,0), (-2,0), (-2,1)],
        [(0,0), (0,-1), (0,-2), (-1,-2)],
        [(0,0), (1,0), (2,-1), (2,0)]
    ],
    "L": [
        [(0,0), (0,1), (1,1), (2,1)],
        [(0,0), (1,0), (1,-1), (1,-2)],
        [(0,0), (0,-1), (-1,-1), (-2,-1)],
        [(0,0), (-1,1), (-1,2), (-1,0)]
    ],
    "S": [
        [(0,0), (1,0), (1,1), (2,1)],
        [(0,0), (0,1), (-1,1), (-1,2)]
    ],
    "Z": [
        [(0,0), (0,1), (1,1), (1,2)],
        [(0,0), (1,0), (1,-1), (2,-1)]
    ]
}

def wrap(coord: int) -> int:
    """Wrap coordinate for toroidal board."""
    return ((coord % 11) + 11) % 11

def bitboard_to_web_board(bitboard: BitBoard) -> Dict[str, Optional[str]]:
    """Convert BitBoard to web format."""
    board = {}
    for r in range(11):
        for c in range(11):
            position = r * 11 + c
            bit = 1 << position
            
            if bitboard.red_board & bit:
                board[f"{r},{c}"] = "red"
            elif bitboard.blue_board & bit:
                board[f"{r},{c}"] = "blue"
            else:
                board[f"{r},{c}"] = None
    
    return board

def piece_to_place_action(piece: str, r: int, c: int, rotation: int) -> PlaceAction:
    """Convert piece placement to PlaceAction."""
    if piece not in TETROMINOES:
        raise ValueError(f"Unknown piece type: {piece}")
    
    shapes = TETROMINOES[piece]
    if rotation >= len(shapes):
        raise ValueError(f"Invalid rotation {rotation} for piece {piece}")
    
    shape = shapes[rotation]
    coords = [Coord(wrap(r + dr), wrap(c + dc)) for dr, dc in shape]
    
    if len(coords) != 4:
        raise ValueError(f"Invalid number of coordinates: {len(coords)}")
    
    return PlaceAction(*coords)

def is_valid_move(bitboard: BitBoard, action: PlaceAction) -> bool:
    """Check if a move is valid on the current board."""
    # Convert PlaceAction coords to binary
    move_binary = 0
    for coord in action.coords:
        position = coord.r * 11 + coord.c
        bit = 1 << position
        
        # Check if position is already occupied
        if (bitboard.red_board | bitboard.blue_board) & bit:
            return False
        
        move_binary |= bit
    
    # Check adjacency requirement (unless first two moves)
    if bitboard.turn_count > 2:
        player_board = bitboard.red_board if bitboard.current_player == "r" else bitboard.blue_board
        
        # Check if at least one coord is adjacent to player's existing piece
        has_adjacent = False
        for coord in action.coords:
            position = coord.r * 11 + coord.c
            bit = 1 << position
            
            # Check adjacency using your adjacency table
            from agent.adjacency_table import adjacency_table
            if player_board & adjacency_table[bit]:
                has_adjacent = True
                break
        
        if not has_adjacent:
            return False
    
    return True

def get_game_state(bitboard: BitBoard) -> GameStateResponse:
    """Convert BitBoard to GameStateResponse."""
    board = bitboard_to_web_board(bitboard)
    
    winner = None
    if bitboard.terminal:
        winner_color = bitboard._find_winner
        if winner_color == "r":
            winner = "red"
        elif winner_color == "b":
            winner = "blue"
        else:
            winner = "draw"
    
    current_player = "red" if bitboard.current_player == "r" else "blue"
    
    return GameStateResponse(
        board=board,
        current_player=current_player,
        game_over=bitboard.terminal,
        winner=winner,
        red_count=bitboard._player_token_count("r"),
        blue_count=bitboard._player_token_count("b"),
        turn_count=bitboard.turn_count,
        valid=True,
        message=None
    )

@app.post("/api/new-game", response_model=NewGameResponse)
async def new_game():
    """Start a new game."""
    import uuid
    game_id = str(uuid.uuid4())
    
    # Initialize new board and agent
    games[game_id] = BitBoard()
    agents[game_id] = Agent(PlayerColor("blue"))
    game_last_activity[game_id] = datetime.now()
    
    board = bitboard_to_web_board(games[game_id])
    
    return NewGameResponse(
        game_id=game_id,
        board=board,
        current_player="red"
    )


# --- New endpoint: player-move ---
@app.post("/api/player-move", response_model=GameStateResponse)
async def player_move(move_request: MoveRequest):
    """
    Process a player move only. Does not make AI move.
    """
    game_id = move_request.game_id
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    game_last_activity[game_id] = datetime.now()
    bitboard = games[game_id]
    try:
        player_action = piece_to_place_action(
            move_request.piece,
            move_request.r,
            move_request.c,
            move_request.rotation
        )
        if not is_valid_move(bitboard, player_action):
            return GameStateResponse(
                board=bitboard_to_web_board(bitboard),
                current_player="red" if bitboard.current_player == "r" else "blue",
                game_over=bitboard.terminal,
                winner=None,
                red_count=bitboard._player_token_count("r"),
                blue_count=bitboard._player_token_count("b"),
                turn_count=bitboard.turn_count,
                valid=False,
                message="Invalid move: piece cannot be placed there"
            )
        bitboard.move_coordinates(player_action)
        return get_game_state(bitboard)
    except Exception as e:
        print(f"Error in player_move: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# --- New endpoint: ai-move ---
from fastapi import Body
@app.post("/api/ai-move", response_model=GameStateResponse)
async def ai_move(data: dict = Body(...)):
    """
    Make the AI move for the current game. Assumes player move already made.
    """
    game_id = data.get("game_id")
    if not game_id or game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    game_last_activity[game_id] = datetime.now()
    bitboard = games[game_id]
    agent = agents[game_id]
    try:
        # If game is already over, just return state
        if bitboard.terminal:
            return get_game_state(bitboard)
        ai_action = agent.action(bitboard)
        bitboard.move_coordinates(ai_action)
        return get_game_state(bitboard)
    except Exception as e:
        print(f"Error in ai_move: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/game/{game_id}", response_model=GameStateResponse)
async def get_game(game_id: str):
    """Get current game state."""
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    
    return get_game_state(games[game_id])

@app.delete("/api/game/{game_id}")
async def delete_game(game_id: str):
    """Delete a game."""
    if game_id in games:
        del games[game_id]
        del agents[game_id]
    return {"message": "Game deleted"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "active_games": len(games)
    }

# Auto-cleanup old games (optional - runs periodically)
import asyncio
from datetime import datetime, timedelta

game_last_activity: Dict[str, datetime] = {}

async def cleanup_old_games():
    """Cleanup games inactive for more than 1 hour."""
    while True:
        await asyncio.sleep(300)  # Check every 5 minutes
        now = datetime.now()
        games_to_delete = []
        
        for game_id, last_active in game_last_activity.items():
            if now - last_active > timedelta(hours=1):
                games_to_delete.append(game_id)
        
        for game_id in games_to_delete:
            if game_id in games:
                del games[game_id]
                del agents[game_id]
                del game_last_activity[game_id]
                print(f"Cleaned up inactive game: {game_id}")

@app.on_event("startup")
async def startup_event():
    """Start background tasks on server startup."""
    asyncio.create_task(cleanup_old_games())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)