import React, { useState, useEffect } from "react";

const CustomCursor: React.FC = () => {
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let ringX = 0;
        let ringY = 0;
        let currentRingX = 0;
        let currentRingY = 0;

        const updateMousePosition = (e: MouseEvent) => {
            // Dot follows exactly
            setDotPosition({ x: e.clientX, y: e.clientY });

            // Update target position for ring
            ringX = e.clientX;
            ringY = e.clientY;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // Smooth ring following with RAF
        const animateRing = () => {
            const speed = 0.15; // Lower = slower/smoother
            currentRingX += (ringX - currentRingX) * speed;
            currentRingY += (ringY - currentRingY) * speed;

            setRingPosition({
                x: currentRingX,
                y: currentRingY,
            });

            requestAnimationFrame(animateRing);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);
        animateRing();

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div className="hidden pointer-fine:block">
            {/* Main cursor dot */}
            <div
                className="fixed pointer-events-none z-9999 transition-transform duration-200"
                style={{
                    left: dotPosition.x,
                    top: dotPosition.y,
                    transform: `translate(-50%, -50%) scale(${
                        isHovering ? 1.5 : 1
                    })`,
                }}
            >
                <div className="w-2 h-2 bg-gray-700 rounded-full mix-blend-difference" />
            </div>

            {/* Outer cursor ring */}
            <div
                className="fixed pointer-events-none z-9999 transition-transform duration-200"
                style={{
                    left: ringPosition.x,
                    top: ringPosition.y,
                    transform: `translate(-50%, -50%) scale(${
                        isHovering ? 1.5 : 1
                    })`,
                }}
            >
                <div className="w-8 h-8 border-2 border-gray-700 rounded-full mix-blend-difference" />
            </div>
        </div>
    );
};

export default CustomCursor;
