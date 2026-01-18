import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
    children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
    const text = React.Children.toArray(children).join("");
    const words = text.split(" ");
    const lastWord = words.pop();
    const firstWords = words.join(" ");

    return (
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-4">
            {/* First words */}
            <span className="font-semibold text-gray-900 dark:text-gray-200">
                {firstWords}{" "}
            </span>

            {/* Last word */}
            {lastWord && (
                <motion.span
                    className="
            font-extrabold bg-clip-text text-transparent
            bg-linear-to-r from-gray-700 via-gray-500 to-gray-300
            dark:from-gray-300 dark:via-gray-400 dark:to-gray-200
          "
                    style={{
                        backgroundSize: "200% 200%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0% 50%",
                    }}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // subtle gradient flow
                        scale: [1, 1.05, 1], // subtle pulse
                        opacity: [0.95, 1, 0.95],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {lastWord}
                </motion.span>
            )}
        </h2>
    );
};

export default SectionTitle;
