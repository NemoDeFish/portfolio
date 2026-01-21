# COMP30024 Artificial Intelligence, Semester 1 2024
# Project Part B: Game Playing Agent
# Updated to work without referee

from agent_wrapper import PlayerColor, Action, PlaceAction, Coord

# Import your existing components
# Adjust these imports based on your actual file structure
try:
    from .monte_carlo_tree_search import MonteCarloTreeSearch
    from .board import BitBoard
except ImportError:
    # If running as standalone
    from monte_carlo_tree_search import MonteCarloTreeSearch
    from board import BitBoard

class Agent:
    """
    This class is the "entry point" for your agent, providing an interface to
    respond to various Tetress game events.
    """

    def __init__(self, color: PlayerColor):
        """
        This constructor method runs when the agent is instantiated.
        Any setup and/or precomputation should be done here.
        
        Note: No longer takes **referee parameter
        """
        self._color = color
        print(f"Testing: I am playing as {color}")

    def action(self, board: BitBoard) -> Action:
        """
        This method is called each time it is the agent's turn to take an action.
        It must always return an action object.
        
        Args:
            board: The current BitBoard state
        
        Returns:
            PlaceAction with 4 coordinates
        """
        
        # For first two moves, use hardcoded openings
        if board.turn_count <= 2:
            if self._color == PlayerColor("blue"):
                if board.is_valid_move(503316480):
                    return PlaceAction(
                        Coord(2, 3), 
                        Coord(2, 4), 
                        Coord(2, 5), 
                        Coord(2, 6) 
                    )
                else:
                    return PlaceAction(
                        Coord(6, 4), 
                        Coord(6, 5), 
                        Coord(7, 3), 
                        Coord(7, 4) 
                )
            else:  # red
                return PlaceAction(
                    Coord(3, 3), 
                    Coord(3, 4), 
                    Coord(4, 3), 
                    Coord(4, 4)
                )
        elif board.turn_count <= 7:
            new_board = board.find_random_child()
            return new_board.last_move_to_coordinates()
        
        # Use MCTS for subsequent moves
        tree = MonteCarloTreeSearch()
        
        # Run MCTS algorithm
        num_simulations = 200
        for _ in range(num_simulations):
            tree.do_rollout(board)
        
        # Choose best move
        selected_node = tree.choose(board)
        action = selected_node.last_move_to_coordinates()
        
        return action