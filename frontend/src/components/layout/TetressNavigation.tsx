import React from "react";
import { HelpCircle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TetressNavigationProps {
    onShowHelp: () => void;
    onNewGame: () => void;
}

const TetressNavigation: React.FC<TetressNavigationProps> = ({
    onShowHelp,
    onNewGame,
}) => {
    const navigate = useNavigate();
    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-200 transition-shadow shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
                {/* Logo and Title */}
                <div className="flex items-center gap-3">
                    <img
                        src="/src/assets/logo.png"
                        alt="Logo"
                        className="h-10 w-auto dark:invert"
                        style={{ userSelect: "none" }}
                    />
                    <span className="pl-3 text-xl md:text-2xl font-bold text-gray-900 tracking-tight select-none">
                        Tetress Battleground
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onShowHelp}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <HelpCircle className="w-5 h-5" />
                        How to Play
                    </button>
                    <button
                        onClick={onNewGame}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow"
                    >
                        <RefreshCw className="w-4 h-4" />
                        New Game
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow"
                    >
                        <Home className="w-4 h-4" />
                        Return to Home
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TetressNavigation;
