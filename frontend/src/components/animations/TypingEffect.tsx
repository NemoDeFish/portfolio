import React, { useState, useEffect } from "react";

interface TypingEffectProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 1500,
    className = "",
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        let timeout: number;

        if (!isDeleting && currentText === currentWord) {
            // Word fully typed, pause before deleting
            timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
        } else if (isDeleting && currentText === "") {
            // Word fully deleted, move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
            // Typing or deleting
            const delay = isDeleting ? deletingSpeed : typingSpeed;
            timeout = setTimeout(() => {
                const updatedText = isDeleting
                    ? currentText.slice(0, -1)
                    : currentWord.slice(0, currentText.length + 1);
                setCurrentText(updatedText);
            }, delay);
        }

        return () => clearTimeout(timeout);
    }, [
        currentText,
        isDeleting,
        currentWordIndex,
        words,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
    ]);

    return (
        <div className={`inline-flex items-center ${className}`}>
            <span>{currentText}</span>{" "}
        </div>
    );
};

export default TypingEffect;
