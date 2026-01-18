import { useState, useEffect } from "react";
import { X, RotateCw } from "lucide-react";
import CustomCursor from "../ui/CustomCursor";
import TetressNavigation from "../layout/TetressNavigation";

// Type definitions
type Player = "red" | "blue";
type CellValue = Player | null;
type BoardState = Record<string, CellValue>;
type Coordinate = [number, number];

interface TetrominoData {
    shapes: Coordinate[][];
    color: string;
}

type TetrominoName = "I" | "O" | "T" | "J" | "L" | "S" | "Z";

// Tetromino patterns (relative to origin cell)
const TETROMINOES: Record<TetrominoName, TetrominoData> = {
    I: {
        shapes: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
        ],
        color: "#ef4444",
    },
    O: {
        shapes: [
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
        ],
        color: "#ef4444",
    },
    T: {
        shapes: [
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [0, -1],
                [0, -2],
                [1, -1],
            ],

            [
                [0, 0],
                [-1, 0],
                [-2, 0],
                [-1, -1],
            ],
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [-1, 1],
            ],
        ],
        color: "#ef4444",
    },
    J: {
        shapes: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 2],
            ],
            [
                [0, 0],
                [-1, 0],
                [-2, 0],
                [-2, 1],
            ],
            [
                [0, 0],
                [0, -1],
                [0, -2],
                [-1, -2],
            ],

            [
                [0, 0],
                [1, 0],
                [2, -1],
                [2, 0],
            ],
        ],
        color: "#ef4444",
    },
    L: {
        shapes: [
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [1, -1],
                [1, -2],
            ],
            [
                [0, 0],
                [0, -1],
                [-1, -1],
                [-2, -1],
            ],
            [
                [0, 0],
                [-1, 1],
                [-1, 2],
                [-1, 0],
            ],
        ],
        color: "#ef4444",
    },
    S: {
        shapes: [
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 0],
                [0, 1],
                [-1, 1],
                [-1, 2],
            ],
        ],
        color: "#ef4444",
    },
    Z: {
        shapes: [
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [1, -1],
                [2, -1],
            ],
        ],
        color: "#ef4444",
    },
};

const TetressGame = () => {
    const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);
    // Helper: wrap coordinate (toroidal board)
    const wrap = (coord: number): number => ((coord % 11) + 11) % 11;

    // Helper: get current shape for selected piece
    const getCurrentShape = (
        piece: TetrominoName,
        rotation: number
    ): Coordinate[] => {
        const shapes = TETROMINOES[piece].shapes;
        return shapes[rotation % shapes.length];
    };

    // Helper: check if placement would be valid (client-side preview only)
    const wouldBeValid = (
        piece: TetrominoName,
        r: number,
        c: number,
        rotation: number
    ): boolean => {
        const shape = getCurrentShape(piece, rotation);
        const coords: Coordinate[] = shape.map(([dr, dc]: [number, number]) => [
            wrap(r + dr),
            wrap(c + dc),
        ]);

        // Check all cells are empty
        for (const [pr, pc] of coords) {
            const key = `${pr},${pc}`;
            if (board[key] !== null) return false;
        }

        // Check adjacency to same color cell (except for first move)
        const playerCellCount = Object.values(board).filter(
            (v) => v === currentPlayer
        ).length;
        if (playerCellCount === 0) {
            // First move, no adjacency required
            return true;
        }

        // For each cell in the tetromino, check if any adjacent cell is currentPlayer
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        let adjacent = false;
        for (const [pr, pc] of coords) {
            for (const [dr, dc] of directions) {
                const nr = wrap(pr + dr);
                const nc = wrap(pc + dc);
                const neighborKey = `${nr},${nc}`;
                if (board[neighborKey] === currentPlayer) {
                    adjacent = true;
                    break;
                }
            }
            if (adjacent) break;
        }
        return adjacent;
    };
    const [gameId, setGameId] = useState<string | null>(null);
    const [board, setBoard] = useState<BoardState>({});
    const [currentPlayer, setCurrentPlayer] = useState<Player>("red");
    const [selectedPiece, setSelectedPiece] = useState<TetrominoName | null>(
        null
    );
    const [selectedRotation, setSelectedRotation] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<Player | "draw" | null>(null);
    const [aiThinking, setAiThinking] = useState<boolean>(false);
    const [hoveredCell, setHoveredCell] = useState<Coordinate | null>(null);
    const [redCount, setRedCount] = useState<number>(0);
    const [blueCount, setBlueCount] = useState<number>(0);
    const [turnCount, setTurnCount] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showHelp, setShowHelp] = useState<boolean>(false);

    // Show help modal on first visit, and initialize new game
    useEffect(() => {
        const seenHelp = localStorage.getItem("tetress_seen_help");
        if (!seenHelp) {
            setShowHelp(true);
        }
        startNewGame();
    }, []);

    const startNewGame = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/new-game", {
                method: "POST",
            });

            if (!response.ok) throw new Error("Failed to start new game");

            const data = await response.json();
            setGameId(data.game_id);
            setBoard(data.board);
            setCurrentPlayer("red");
            setGameOver(false);
            setWinner(null);
            setSelectedPiece(null);
            setSelectedRotation(0);
            setRedCount(0);
            setBlueCount(0);
            setTurnCount(1);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error starting new game:", error);
            alert(
                "Failed to start new game. Make sure the backend is running."
            );
        }
    };

    // Update game state from API response
    const updateGameState = (response: any) => {
        setBoard(response.board);
        setCurrentPlayer(response.current_player);
        setGameOver(response.game_over);
        setWinner(response.winner);
        setRedCount(response.red_count);
        setBlueCount(response.blue_count);
        setTurnCount(response.turn_count);

        if (!response.valid && response.message) {
            setErrorMessage(response.message);
            setTimeout(() => setErrorMessage(null), 3000);
        } else {
            setErrorMessage(null);
        }
    };

    // Make a move with optimistic UI and split endpoints
    const makeMove = async (
        piece: TetrominoName,
        r: number,
        c: number,
        rotation: number
    ) => {
        if (!gameId || currentPlayer !== "red" || gameOver) return;

        // Optimistically update board state for player move
        const shape = getCurrentShape(piece, rotation);
        const coords: Coordinate[] = shape.map(([dr, dc]) => [
            wrap(r + dr),
            wrap(c + dc),
        ]);
        // Create a shallow copy of the board
        let newBoard = { ...board };
        coords.forEach(([pr, pc]) => {
            newBoard[`${pr},${pc}`] = "red";
        });
        // Optionally, clear lines here if you want to simulate line clearing on the client
        setBoard(newBoard);
        setRedCount(redCount + 4); // Approximate, will be corrected by backend
        setAiThinking(true);

        try {
            // 1. Send player move
            const response = await fetch(
                "http://localhost:8000/api/player-move",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        game_id: gameId,
                        piece,
                        r,
                        c,
                        rotation,
                    }),
                }
            );

            if (!response.ok) throw new Error("Move failed");

            const data = await response.json();

            if (!data.valid) {
                setErrorMessage(data.message || "Invalid move");
                setTimeout(() => setErrorMessage(null), 3000);
                setAiThinking(false);
                // Revert optimistic update
                updateGameState(data);
                // Do NOT clear selectedPiece or selectedRotation here
                return;
            }

            // Update state with backend-confirmed player move (with line clears, etc.)
            updateGameState(data);
            setSelectedPiece(null);
            setSelectedRotation(0);

            // If game over after player move, stop
            if (data.game_over) {
                setAiThinking(false);
                return;
            }

            // 2. Ask backend for AI move
            const aiResponse = await fetch(
                "http://localhost:8000/api/ai-move",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        game_id: gameId,
                    }),
                }
            );
            if (!aiResponse.ok) throw new Error("AI move failed");
            const aiData = await aiResponse.json();
            updateGameState(aiData);
        } catch (error) {
            console.error("Error making move:", error);
            setErrorMessage("Failed to make move");
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setAiThinking(false);
        }
    };

    // Handle cell click
    const handleCellClick = (r: number, c: number) => {
        if (currentPlayer !== "red" || !selectedPiece || gameOver || aiThinking)
            return;
        makeMove(selectedPiece, r, c, selectedRotation);
    };

    // Get preview cells
    const getPreviewCells = (): { coords: Coordinate[]; valid: boolean } => {
        if (
            !selectedPiece ||
            !hoveredCell ||
            currentPlayer !== "red" ||
            gameOver
        ) {
            return { coords: [], valid: false };
        }
        const [r, c] = hoveredCell;
        const shape = getCurrentShape(selectedPiece, selectedRotation);
        const coords: Coordinate[] = shape.map(([dr, dc]) => [
            wrap(r + dr),
            wrap(c + dc),
        ]);
        const valid = wouldBeValid(selectedPiece, r, c, selectedRotation);
        return { coords, valid };
    };

    const preview = getPreviewCells();

    // Handle wheel rotation
    const handleWheel = (e: React.WheelEvent) => {
        if (selectedPiece && currentPlayer === "red" && !gameOver) {
            e.preventDefault();
            const shapes = TETROMINOES[selectedPiece].shapes;
            if (e.deltaY > 0) {
                setSelectedRotation((selectedRotation + 1) % shapes.length);
            } else {
                setSelectedRotation(
                    (selectedRotation - 1 + shapes.length) % shapes.length
                );
            }
        }
    };

    return (
        <div className="h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col overflow-hidden">
            <CustomCursor />
            {/* Header */}
            <TetressNavigation
                onShowHelp={() => setShowHelp(true)}
                onNewGame={startNewGame}
            />

            {/* Error Message */}
            {errorMessage && (
                <div className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2 w-full max-w-md px-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg shadow text-center text-red-700 text-sm py-3 px-6 animate-fade-in">
                        {errorMessage}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-0 md:p-6 overflow-auto pt-24 md:pt-18">
                <div className="max-w-7xl w-full flex gap-12 items-center justify-center">
                    {/* Piece Selection */}
                    <div className="items-center flex flex-col gap-8">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Pieces
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                {(
                                    Object.entries(TETROMINOES) as [
                                        TetrominoName,
                                        TetrominoData
                                    ][]
                                ).map(([name, data]) => (
                                    <button
                                        key={name}
                                        onClick={() => {
                                            setSelectedPiece(name);
                                            setSelectedRotation(0);
                                        }}
                                        disabled={
                                            gameOver ||
                                            currentPlayer !== "red" ||
                                            aiThinking
                                        }
                                        className={`relative p-0 transition-all ${
                                            selectedPiece === name
                                                ? "opacity-100 scale-105"
                                                : "opacity-40 hover:opacity-70"
                                        } ${
                                            gameOver ||
                                            currentPlayer !== "red" ||
                                            aiThinking
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                        style={{
                                            background: "none",
                                            border: "none",
                                        }}
                                    >
                                        <div
                                            className="grid gap-0.5"
                                            style={{
                                                gridTemplateColumns:
                                                    "repeat(4, 32px)",
                                                gridTemplateRows:
                                                    "repeat(4, 32px)",
                                            }}
                                        >
                                            {Array.from({ length: 16 }).map(
                                                (_, i) => {
                                                    const r = Math.floor(i / 4);
                                                    const c = i % 4;
                                                    const isActive =
                                                        data.shapes[0].some(
                                                            ([pr, pc]) =>
                                                                pr === r &&
                                                                pc === c
                                                        );
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="w-8 h-8 rounded-lg border-2"
                                                            style={{
                                                                backgroundColor:
                                                                    isActive
                                                                        ? data.color
                                                                        : "transparent",
                                                                borderColor:
                                                                    isActive
                                                                        ? "#b91c1c"
                                                                        : "transparent",
                                                                boxShadow:
                                                                    isActive
                                                                        ? "0 2px 8px 0 rgba(239,68,68,0.15)"
                                                                        : undefined,
                                                            }}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (
                                    selectedPiece &&
                                    currentPlayer === "red" &&
                                    !gameOver
                                ) {
                                    const shapes =
                                        TETROMINOES[selectedPiece].shapes;
                                    setSelectedRotation(
                                        (selectedRotation + 1) % shapes.length
                                    );
                                }
                            }}
                            disabled={
                                !selectedPiece ||
                                currentPlayer !== "red" ||
                                gameOver ||
                                aiThinking
                            }
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors shadow
                                ${
                                    !selectedPiece ||
                                    currentPlayer !== "red" ||
                                    gameOver ||
                                    aiThinking
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }
                            `}
                            style={{ minHeight: 44 }}
                        >
                            <RotateCw className="w-4 h-4" />
                            Rotate{" "}
                            {selectedPiece
                                ? `(${selectedRotation + 1}/${
                                      selectedPiece
                                          ? TETROMINOES[selectedPiece].shapes
                                                .length
                                          : 0
                                  })`
                                : ""}
                        </button>

                        {/* Game Info */}
                        <div className="rounded-xl bg-white/90 shadow border border-gray-200 px-6 py-4 mt-2 flex flex-col gap-2 text-base w-56">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">
                                    Turn
                                </span>
                                <span className="font-bold text-gray-900">
                                    {turnCount}{" "}
                                    <span className="text-xs font-normal text-gray-400">
                                        / 150
                                    </span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-red-500 font-semibold">
                                    You
                                </span>
                                <span className="font-bold text-gray-900">
                                    {redCount}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-500 font-semibold">
                                    AI
                                </span>
                                <span className="font-bold text-gray-900">
                                    {blueCount}
                                </span>
                            </div>
                            <div className="text-center py-1 text-sm font-semibold">
                                {gameOver ? (
                                    winner === "draw" ? (
                                        <span className="text-gray-700">
                                            Game Over: Draw!
                                        </span>
                                    ) : winner === "red" ? (
                                        <span className="text-red-500">
                                            Game Over: You Win!
                                        </span>
                                    ) : (
                                        <span className="text-blue-500">
                                            Game Over: AI Wins!
                                        </span>
                                    )
                                ) : aiThinking ? (
                                    <span className="text-blue-500 animate-pulse">
                                        AI thinking...
                                    </span>
                                ) : currentPlayer === "red" ? (
                                    <span className="text-red-500">
                                        Your turn
                                    </span>
                                ) : (
                                    <span className="text-blue-500">
                                        AI's turn
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Game Board */}
                    <div
                        className="shadow-2xl rounded-2xl border-4 border-gray-300 bg-white flex items-center justify-center"
                        style={{
                            width: "min(80vh, 700px)",
                            height: "min(80vh, 700px)",
                            minWidth: 350,
                            minHeight: 350,
                            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
                        }}
                        onWheel={handleWheel}
                    >
                        <div
                            className="grid bg-gray-200 w-full h-full p-2 rounded-xl"
                            style={{
                                gridTemplateColumns: "repeat(11, 1fr)",
                                gridTemplateRows: "repeat(11, 1fr)",
                                gap: "1px",
                            }}
                        >
                            {Array.from({ length: 121 }).map((_, i) => {
                                const r = Math.floor(i / 11);
                                const c = i % 11;
                                const key = `${r},${c}`;
                                const tile = board[key];
                                const isPreview = preview.coords.some(
                                    ([pr, pc]) => pr === r && pc === c
                                );

                                return (
                                    <div
                                        key={key}
                                        onClick={() => handleCellClick(r, c)}
                                        onMouseEnter={() =>
                                            setHoveredCell([r, c])
                                        }
                                        onMouseLeave={() =>
                                            setHoveredCell(null)
                                        }
                                        className={`relative flex items-center justify-center transition-all rounded-lg border-2 aspect-square ${
                                            tile
                                                ? tile === "red"
                                                    ? "bg-red-500 border-red-400 shadow-md"
                                                    : "bg-blue-500 border-blue-400 shadow-md"
                                                : "bg-gray-100 hover:bg-gray-300 cursor-pointer border-gray-300"
                                        }`}
                                        style={{ minWidth: 0, minHeight: 0 }}
                                    >
                                        {/* Preview overlay */}
                                        {isPreview && (
                                            <div
                                                className={`absolute inset-0 rounded-lg ${
                                                    tile
                                                        ? "bg-yellow-400/60" // Show yellow overlay on occupied cells
                                                        : preview.valid
                                                        ? "bg-red-400/40" // Show red on valid empty cells
                                                        : "bg-gray-400/40" // Show grey on invalid empty cells
                                                }`}
                                                style={{
                                                    pointerEvents: "none",
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Help Modal */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                How to Play
                            </h2>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p>
                                <strong>Objective:</strong> Outscore your
                                opponent by placing more tokens. Win by blocking
                                your opponent or having more tokens after 150
                                moves.
                            </p>
                            <div className="space-y-2">
                                <p>
                                    <strong>How to play:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>
                                        Click a piece on the left to select it
                                    </li>
                                    <li>
                                        Use the rotate button or scroll wheel to
                                        change orientation
                                    </li>
                                    <li>
                                        Click on the board to place your piece
                                    </li>
                                    <li>
                                        Pieces must be adjacent to your existing
                                        pieces (after first move)
                                    </li>
                                    <li>
                                        Complete rows or columns are
                                        automatically cleared
                                    </li>
                                </ul>
                            </div>

                            <p className="text-xs text-gray-500 pt-2">
                                <strong>Note:</strong> The board wraps around at
                                the edges (toroidal).
                            </p>
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                <strong>Best played on desktop!</strong>
                                <br />
                                This game is not currently supported on mobile
                                or tablet devices.
                                <br />
                                If you enjoy the game and would like to see a
                                responsive/mobile version, please connect with
                                me to request it!
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                id="dont-show-again"
                                type="checkbox"
                                checked={dontShowAgain}
                                onChange={(e) =>
                                    setDontShowAgain(e.target.checked)
                                }
                                className="mr-2"
                            />
                            <label
                                htmlFor="dont-show-again"
                                className="text-xs text-gray-600 select-none"
                            >
                                Do not show again
                            </label>
                        </div>
                        <button
                            onClick={() => {
                                if (dontShowAgain) {
                                    localStorage.setItem(
                                        "tetress_seen_help",
                                        "1"
                                    );
                                }
                                setShowHelp(false);
                            }}
                            className="mt-6 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TetressGame;
