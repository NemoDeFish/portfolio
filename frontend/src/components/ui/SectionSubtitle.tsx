import React from "react";

interface SectionSubtitleProps {
    children: React.ReactNode;
}

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({ children }) => {
    return (
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light text-center mb-8">
            {children}
        </p>
    );
};

export default SectionSubtitle;
