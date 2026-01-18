import { useState, useEffect } from "react";
import {
    Play,
    Pause,
    RotateCcw,
    Brain,
    Loader2,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import CustomCursor from "../ui/CustomCursor";
import ASTetressNavigation from "../layout/ASTetressNavigation";

type PlayerColor = "RED" | "BLUE" | null;
type Board = PlayerColor[][];

interface SearchState {
    board: Board;
    depth: number;
    f: number;
    g: number;
    h: number;
    action?: { r: number; c: number }[];
    message: string;
}

const BOARD_SIZE = 11;

const TetressDemo = () => {
    // Track if full solution is being shown
    const [showFullSolution, setShowFullSolution] = useState(false);
    const [board] = useState<Board>(createEmptyBoard());
    const [showHelp, setShowHelp] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(() => {
        return localStorage.getItem("astetress_seen_help") === "1";
    });
    const [targetCoord, setTargetCoord] = useState<{
        r: number;
        c: number;
    } | null>(null);
    const [testCases, setTestCases] = useState<string[]>([]);
    const [selectedTest, setSelectedTest] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTests, setIsLoadingTests] = useState(true);
    const [searchStates, setSearchStates] = useState<SearchState[]>([]);
    const [currentStateIndex, setCurrentStateIndex] = useState(0);
    const [solution, setSolution] = useState<
        { r: number; c: number }[][] | null
    >(null);
    const [solutionSteps, setSolutionSteps] = useState<Board[] | null>(null);
    const [currentSolutionStep, setCurrentSolutionStep] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playSpeed, setPlaySpeed] = useState(1); // 1 = normal, 2 = fast, 0.5 = slow
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<{
        nodesExplored: number;
        solutionLength: number;
    } | null>(null);

    function createEmptyBoard(): Board {
        return Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill(null));
    }

    // Only one test case for now, hardcode it
    useEffect(() => {
        setTestCases([
            "Visible A",
            "Visible B",
            "Easy A",
            "Easy B",
            "Trap A",
            "Trap B",
            "Hard A",
            "Hard B",
            "Hard C",
        ]);
        setSelectedTest("Visible A");
        setIsLoadingTests(false);
        // Show help modal on first visit
        if (!dontShowAgain) setShowHelp(true);
    }, []);

    const handleTestCaseChange = (testName: string) => {
        setSelectedTest(testName);
        // Optionally reset state if you add more test cases
    };

    const solvePuzzle = async () => {
        if (!selectedTest) {
            setError("Please select a test case");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSearchStates([]);
        setCurrentStateIndex(0);
        setSolution(null);
        setSolutionSteps(null);
        setCurrentSolutionStep(-1);
        setStats(null);

        try {
            // Generalize to fetch the JSON file based on selected test case name
            const jsonPath = `/astar_replays/${selectedTest}.json`;
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error("Failed to load replay JSON");
            const replayData = await response.json();
            setSearchStates(replayData.search_states || []);
            setCurrentStateIndex(0);
            setSolution(replayData.solution || null);
            setSolutionSteps(replayData.solution_step || null);
            setCurrentSolutionStep(-1);
            setStats({
                nodesExplored: replayData.search_states
                    ? replayData.search_states.length
                    : 0,
                solutionLength: replayData.solution
                    ? replayData.solution.length
                    : 0,
            });
            // Optionally set targetCoord if available in first search state
            if (replayData.search_states && replayData.target) {
                setTargetCoord(replayData.target);
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load replay JSON."
            );
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isPlaying && currentStateIndex < searchStates.length - 1) {
            const speedMap: Record<string, number> = {
                "0.5": 200,
                "1": 100,
                "2": 50,
            };
            const delay = speedMap[String(playSpeed)] || 400;
            const timer = setTimeout(() => {
                setCurrentStateIndex((prev) => prev + 1);
            }, delay);
            return () => clearTimeout(timer);
        } else if (currentStateIndex >= searchStates.length - 1) {
            setIsPlaying(false);
        }
    }, [isPlaying, currentStateIndex, searchStates.length, playSpeed]);

    const handlePlayPause = () => {
        // When Play is clicked, always hide full solution and reset step
        setShowFullSolution(false);
        setCurrentSolutionStep(-1);
        if (currentStateIndex >= searchStates.length - 1) {
            setCurrentStateIndex(0);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const handleReset = () => {
        setCurrentStateIndex(0);
        setIsPlaying(false);
        setShowFullSolution(false);
        setCurrentSolutionStep(-1);
    };

    let displayBoard: Board = board;
    // If showing full solution, display the final solution board
    if (showFullSolution && solutionSteps && solutionSteps.length > 0) {
        displayBoard = solutionSteps[solutionSteps.length - 1];
    } else if (
        currentSolutionStep >= 0 &&
        solutionSteps &&
        solutionSteps[currentSolutionStep]
    ) {
        displayBoard = solutionSteps[currentSolutionStep];
    } else {
        const currentState = searchStates[currentStateIndex];
        displayBoard = currentState ? currentState.board : board;
    }

    // Match MCTSTetress.tsx cell style exactly
    const getCellClass = (r: number, c: number) => {
        const cell = displayBoard[r][c];
        const isTarget =
            targetCoord && r === targetCoord.r && c === targetCoord.c;
        let isSolutionPiece = false;
        // Highlight solution pieces for the current step, or all for full solution
        if (solution && solution.length > 0) {
            if (showFullSolution && solutionSteps && solutionSteps.length > 0) {
                // Show all solution pieces for full solution
                for (const step of solution) {
                    for (const coord of step) {
                        if (coord.r === r && coord.c === c) {
                            isSolutionPiece = true;
                            break;
                        }
                    }
                    if (isSolutionPiece) break;
                }
            } else if (currentSolutionStep >= 0) {
                for (const coord of solution[currentSolutionStep]) {
                    if (coord.r === r && coord.c === c) {
                        isSolutionPiece = true;
                        break;
                    }
                }
            } else if (currentStateIndex === searchStates.length - 1) {
                for (const step of solution) {
                    for (const coord of step) {
                        if (coord.r === r && coord.c === c) {
                            isSolutionPiece = true;
                            break;
                        }
                    }
                    if (isSolutionPiece) break;
                }
            }
        }

        // MCTSTetress cell style
        let classes =
            "relative flex items-center justify-center transition-all rounded-lg border-2 aspect-square ";
        if (cell) {
            if (cell === "RED") {
                classes += "bg-red-500 border-red-400 shadow-md";
            } else if (cell === "BLUE") {
                classes += "bg-blue-500 border-blue-400 shadow-md";
            }
        } else {
            classes +=
                "bg-gray-100 hover:bg-gray-300 cursor-pointer border-gray-300";
        }
        if (isSolutionPiece) {
            classes +=
                " ring-4 ring-yellow-400 animate-pulse shadow-[0_0_12px_4px_rgba(253,224,71,0.7)] z-10";
        } else if (isTarget && cell === "BLUE") {
            classes +=
                " ring-4 ring-blue-500 shadow-[0_0_16px_6px_rgba(59,130,246,0.6)] z-20 animate-pulse";
        } else if (isTarget) {
            classes +=
                " ring-4 ring-blue-400 shadow-[0_0_10px_3px_rgba(59,130,246,0.4)] z-10 animate-pulse";
        }
        return classes;
    };

    if (isLoadingTests) {
        return (
            <div className="h-screen bg-linear-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-400" />
                    <p className="text-gray-400">Loading test cases...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col overflow-hidden">
            <CustomCursor />
            <ASTetressNavigation onShowHelp={() => setShowHelp(true)} />
            {/* How to Play Modal (Single Player Tetress rules) */}
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
                                <span style={{ fontSize: 24, fontWeight: 600 }}>
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p>
                                <strong>Objective:</strong> Remove the{" "}
                                <span className="text-blue-600 font-semibold">
                                    target Blue token
                                </span>{" "}
                                from the board in as few moves as possible. You
                                play as{" "}
                                <span className="text-red-600 font-semibold">
                                    Red
                                </span>{" "}
                                and can only place Red tokens. The goal is to
                                clear the row or column containing the target
                                Blue token, causing it to be removed.
                            </p>
                            <div className="space-y-2">
                                <p>
                                    <strong>How to play:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>
                                        Only{" "}
                                        <span className="text-red-600 font-semibold">
                                            Red
                                        </span>{" "}
                                        can play. Blue does not play.
                                    </li>
                                    <li>
                                        Click on an empty cell adjacent to an
                                        existing Red token to place a Red token.
                                    </li>
                                    <li>
                                        When a row or column is completely
                                        filled, it is cleared (all tokens in
                                        that row/column are removed).
                                    </li>
                                    <li>
                                        The board wraps around at the edges
                                        (toroidal).
                                    </li>
                                    <li>
                                        The puzzle is solved when the target
                                        Blue token is removed by clearing its
                                        row or column.
                                    </li>
                                    <li>
                                        The cost of a solution is the number of
                                        actions taken by Red to remove the
                                        target Blue token.
                                    </li>
                                    <li>Some puzzles may have no solution.</li>
                                </ul>
                            </div>
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
                                        "astetress_seen_help",
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
            <div className="flex-1 flex items-center justify-center pt-14 px-6">
                <div className="max-w-7xl w-full flex gap-12 items-center justify-center">
                    {/* Left: Controls and Solution */}
                    <div className="flex flex-col gap-6 items-stretch w-120 max-w-lg mt-5">
                        <div className="rounded-2xl bg-white/90 shadow border border-gray-200 px-8 py-6 flex flex-col">
                            {/* Test Case Selection */}
                            <div className="mb-4">
                                <label className="text-sm text-gray-500">
                                    Select Test Case
                                </label>
                                <select
                                    value={selectedTest}
                                    onChange={(e) =>
                                        handleTestCaseChange(e.target.value)
                                    }
                                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                                >
                                    {testCases.map((name) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={solvePuzzle}
                                disabled={isLoading || !selectedTest}
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Solving...
                                    </>
                                ) : (
                                    <>
                                        <Brain className="w-5 h-5" />
                                        Load Puzzle
                                    </>
                                )}
                            </button>
                            {error && (
                                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                                    <AlertCircle className="w-5 h-5" />
                                    {error}
                                </div>
                            )}
                            {/* Playback Controls (always visible, disabled if not loaded) */}
                            <div className="flex gap-3 mb-2 justify-center items-center">
                                <button
                                    onClick={handlePlayPause}
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        searchStates.length === 0 || isLoading
                                    }
                                >
                                    {isPlaying ? (
                                        <Pause className="w-5 h-5" />
                                    ) : (
                                        <Play className="w-5 h-5" />
                                    )}
                                    {isPlaying
                                        ? "Pause"
                                        : currentStateIndex >=
                                          searchStates.length - 1
                                        ? "Replay"
                                        : "Play"}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        searchStates.length === 0 || isLoading
                                    }
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Reset
                                </button>
                                <select
                                    value={playSpeed}
                                    onChange={(e) =>
                                        setPlaySpeed(Number(e.target.value))
                                    }
                                    className="pl-3 pr-6 py-2 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 text-base transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                                    disabled={
                                        searchStates.length === 0 || isLoading
                                    }
                                    title="Playback speed"
                                    style={{ minWidth: 90, height: 44 }}
                                >
                                    <option value={0.5}>0.5x</option>
                                    <option value={1}>1x</option>
                                    <option value={2}>2x</option>
                                </select>
                            </div>
                            {/* Progress Slider (always visible, disabled if not loaded) */}
                            <div className="flex flex-col gap-1">
                                <div className="pb-3" />
                                <input
                                    type="range"
                                    min="0"
                                    max={
                                        searchStates.length > 0
                                            ? searchStates.length - 1
                                            : 0
                                    }
                                    value={currentStateIndex}
                                    onChange={(e) => {
                                        setCurrentStateIndex(
                                            parseInt(e.target.value)
                                        );
                                        setIsPlaying(false);
                                        setCurrentSolutionStep(-1);
                                    }}
                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    disabled={
                                        searchStates.length === 0 || isLoading
                                    }
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Start</span>
                                    <span>
                                        State{" "}
                                        {searchStates.length === 0
                                            ? 0
                                            : currentStateIndex + 1}{" "}
                                        / {searchStates.length}
                                    </span>
                                    <span>End</span>
                                </div>
                            </div>
                        </div>
                        {/* Solution Panel */}
                        <div className="rounded-2xl bg-linear-to-br from-green-50 via-blue-50 to-white shadow-lg border-2 border-green-300 p-3 flex flex-col items-center min-w-[320px]">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-green-700 tracking-tight">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                Solution
                            </h3>
                            <div className="p-3 w-full flex flex-col items-center">
                                <p className="text-gray-800 text-base mb-3 text-center font-medium">
                                    The final piece in the solution path is{" "}
                                    <span className="text-yellow-600 font-bold">
                                        highlighted in yellow
                                    </span>{" "}
                                    on the board.{" "}
                                    <span className="text-green-700 font-bold">
                                        Optimal solution
                                    </span>{" "}
                                    with{" "}
                                    <span className="font-bold text-yellow-600">
                                        {solution && solution.length > 0
                                            ? solution.length
                                            : "0"}{" "}
                                        move(s)
                                    </span>{" "}
                                    found after exploring{" "}
                                    <span className="font-bold text-yellow-600">
                                        {stats &&
                                        typeof stats.nodesExplored === "number"
                                            ? stats.nodesExplored
                                            : "?"}{" "}
                                        nodes
                                    </span>
                                    .
                                </p>
                                {/* Solution Step Navigation */}
                                {solutionSteps && solutionSteps.length > 0 && (
                                    <div className="flex flex-col items-center gap-2 mt-2">
                                        <div className="flex gap-2">
                                            <button
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow disabled:opacity-50"
                                                onClick={() => {
                                                    setCurrentSolutionStep(
                                                        (prev) =>
                                                            Math.max(
                                                                0,
                                                                prev - 1
                                                            )
                                                    );
                                                    setShowFullSolution(false);
                                                }}
                                                disabled={
                                                    currentSolutionStep <= 0 ||
                                                    showFullSolution
                                                }
                                            >
                                                Previous
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow disabled:opacity-50"
                                                onClick={() => {
                                                    setCurrentSolutionStep(
                                                        (prev) =>
                                                            Math.min(
                                                                solutionSteps.length -
                                                                    1,
                                                                prev + 1
                                                            )
                                                    );
                                                    setShowFullSolution(false);
                                                }}
                                                disabled={
                                                    currentSolutionStep >=
                                                        solutionSteps.length -
                                                            1 ||
                                                    showFullSolution
                                                }
                                            >
                                                Next
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold shadow"
                                                onClick={() => {
                                                    setShowFullSolution(true);
                                                    setCurrentSolutionStep(-1);
                                                }}
                                                disabled={showFullSolution}
                                            >
                                                Show Full Solution
                                            </button>
                                        </div>
                                        <div className="text-yellow-600 text-sm font-semibold">
                                            {showFullSolution
                                                ? `Full Solution`
                                                : `Step ${
                                                      currentSolutionStep + 1
                                                  } / ${solutionSteps.length}`}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Right: Board Grid Only */}
                    <div className="flex items-center justify-center flex-1">
                        <div
                            className="shadow-2xl rounded-2xl border-4 border-gray-300 bg-white flex items-center justify-center"
                            style={{
                                width: "min(80vh, 700px)",
                                height: "min(80vh, 700px)",
                                minWidth: 350,
                                minHeight: 350,
                                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
                            }}
                        >
                            <div
                                className="grid bg-gray-200 w-full h-full p-2 rounded-xl gap-1"
                                style={{
                                    gridTemplateColumns: "repeat(11, 1fr)",
                                    gridTemplateRows: "repeat(11, 1fr)",
                                    gap: "1px",
                                }}
                            >
                                {Array.from({ length: 121 }).map((_, i) => {
                                    const r = Math.floor(i / 11);
                                    const c = i % 11;
                                    return (
                                        <div
                                            key={`${r},${c}`}
                                            className={getCellClass(r, c)}
                                            style={{
                                                minWidth: 0,
                                                minHeight: 0,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TetressDemo;
