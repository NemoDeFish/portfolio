import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navigation: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                "home",
                "about",
                "skills",
                "experience",
                "projects",
                "achievements",
                "contact",
            ];
            let currentSection = "home";
            for (let id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    if (window.scrollY >= element.offsetTop - 80) {
                        currentSection = id;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
        }
        setMobileMenuOpen(false);
    };

    const navItems = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "achievements",
        "contact",
    ];

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl z-50 border-b border-gray-200 dark:border-gray-800 transition-shadow shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between relative">
                {/* Logo */}
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="flex items-center"
                >
                    <img
                        src="src/assets/logo.png"
                        alt="Logo"
                        className="ml-2 h-15 md:h-18 landscape:h-14 md:landscape:h-15 xl:landscape:h-20 2xl:landscape:h-15 p-2 w-auto dark:invert"
                    />
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4 lg:space-x-8 absolute left-1/2 -translate-x-1/2">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className={`relative text-sm xl:text-xl 2xl:text-sm font-medium capitalize transition-all duration-300 transform ${
                                activeSection === item
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-600 dark:text-gray-300"
                            } hover:text-gray-900 dark:hover:text-white hover:scale-105 group`}
                        >
                            {item}
                            {/* Animated underline */}
                            <span
                                className={`absolute left-0 -bottom-1 w-full h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ease-out transform origin-left ${
                                    activeSection === item
                                        ? "scale-x-100 opacity-100"
                                        : "scale-x-0 opacity-0"
                                } group-hover:scale-x-100 group-hover:opacity-100`}
                            ></span>
                        </button>
                    ))}
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition transform hover:scale-110 hover:shadow-lg"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800 transition transform hover:scale-110 hover:shadow-lg"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden px-6 transition-all duration-300 overflow-hidden ${
                    mobileMenuOpen
                        ? "max-h-125 opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                {navItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className={`relative w-full text-left text-sm font-medium capitalize transition-all duration-300 transform ${
                            activeSection === item
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-600 dark:text-gray-300"
                        } mb-4`}
                    >
                        <span className="inline-block relative">
                            {item}
                            {/* Animated underline */}
                            <span
                                className={`absolute left-0 -bottom-1 w-full h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ease-out transform origin-left ${
                                    activeSection === item
                                        ? "scale-x-100 opacity-100"
                                        : "scale-x-0 opacity-0"
                                }`}
                            ></span>
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
