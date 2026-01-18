import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = "primary",
    fullWidth = false,
}) => {
    const baseClasses =
        "px-10 py-4 rounded-full font-medium transition shadow-lg hover:shadow-xl";

    const variantClasses = {
        primary: "bg-blue-600 text-white",
        secondary: "bg-gray-100 text-gray-900",
    };

    const widthClasses = fullWidth ? "w-full" : "";

    return (
        <motion.button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${widthClasses}`}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0,0,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
