import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IconType } from "react-icons";

/* ------------------ Types ------------------ */

export interface Category {
    name: string;
    icon: IconType;
}

interface CustomDropdownProps {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: (val: string) => void;
}

/* ------------------ Component ------------------ */

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selected = categories.find((c) => c.name === selectedCategory);

    const handleSelect = (name: string) => {
        setSelectedCategory(name);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {/* Selected button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="
                    w-full flex items-center justify-between px-4 py-2 text-sm
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    border-2 border-gray-200 dark:border-gray-700
                    rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    transition
                "
            >
                <div className="flex items-center gap-2">
                    {selected?.icon && (
                        <selected.icon
                            size={16}
                            className="text-gray-700 dark:text-gray-300"
                        />
                    )}
                    <span>{selected?.name ?? "Select category"}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {/* Dropdown list */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="
                            absolute w-full mt-1 z-50
                            bg-white dark:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            rounded-lg shadow-lg
                            text-gray-900 dark:text-gray-100
                        "
                    >
                        {categories.map(({ name, icon: Icon }) => (
                            <li
                                key={name}
                                onClick={() => handleSelect(name)}
                                className={`
                                    flex items-center gap-2 px-4 py-2 cursor-pointer
                                    hover:bg-gray-100 dark:hover:bg-gray-700
                                    transition
                                    ${
                                        selectedCategory === name
                                            ? "bg-gray-200 dark:bg-gray-700"
                                            : ""
                                    }
                                `}
                            >
                                <Icon
                                    size={16}
                                    className="text-gray-700 dark:text-gray-300"
                                />
                                <span>{name}</span>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomDropdown;
