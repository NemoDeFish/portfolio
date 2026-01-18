import React from "react";

interface CardProps {
    children: React.ReactNode;
    hoverable?: boolean;
    padding?: "small" | "medium" | "large";
}

const Card: React.FC<CardProps> = ({
    children,
    hoverable = false,
    padding = "medium",
}) => {
    const baseClasses = "bg-white rounded-3xl shadow-sm transition";
    const hoverClasses = hoverable ? "hover:shadow-md" : "";

    const paddingClasses = {
        small: "p-6",
        medium: "p-8",
        large: "p-12",
    };

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]}`}
        >
            {children}
        </div>
    );
};

export default Card;
