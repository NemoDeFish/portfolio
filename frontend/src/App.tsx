import React, { useState } from "react";
import Navigation from "./components/layout/Navigation";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Achievements from "./components/sections/Achievements";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import CustomCursor from "./components/ui/CustomCursor";
import LoadingScreen from "./components/animations/LoadingScreen";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import MCTSTetress from "./components/sections/MCTSTetress";
import ASTetress from "./components/sections/ASTetress";

const App: React.FC = () => {
    // Track whether the loader is finished
    const [loadingFinished, setLoadingFinished] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Main app route */}
                <Route
                    path="/"
                    element={
                        <div className="min-h-screen bg-white dark:bg-[#212121]">
                            <CustomCursor />
                            <Navigation />
                            {/* Loader */}
                            <LoadingScreen
                                onFinish={() => setLoadingFinished(true)}
                            />
                            {/* Only show main content after loader finishes */}
                            {loadingFinished && (
                                <main>
                                    <Hero />
                                    <About />
                                    <Skills />
                                    <Experience />
                                    <Projects />
                                    <Achievements />
                                    <Contact />
                                </main>
                            )}
                        </div>
                    }
                />
                {/* MCTS Tetress agent page */}
                <Route path="/mcts-tetress" element={<MCTSTetress />} />
                {/* AS Tetress agent page */}
                <Route path="/astar-tetress" element={<ASTetress />} />
                {/* Optional: Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
