"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";
import SectionSubtitle from "../ui/SectionSubtitle";
import SectionTitle from "../ui/SectionTitle";
import CustomDropdown from "../ui/CustomDropdown";
import { ChevronDown, ChevronUp } from "lucide-react";
import { projectsData, categories } from "../../data/projects";

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [showAll, setShowAll] = useState(false);

    const filteredProjects =
        activeCategory === "All"
            ? projectsData
            : projectsData.filter(
                  (project) => project.category === activeCategory
              );

    const visibleProjects = showAll
        ? filteredProjects
        : filteredProjects.slice(0, 6);

    useEffect(() => {
        if (isInitialLoad) {
            const timer = setTimeout(() => setIsInitialLoad(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [isInitialLoad]);

    return (
        <section
            id="projects"
            className="min-h-screen pt-20 pb-20 px-6 bg-gray-50 dark:bg-gray-950 transition-colors"
        >
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <FadeInWhenVisible>
                    <div className="text-center">
                        <SectionTitle>My Projects</SectionTitle>
                        <SectionSubtitle>
                            A collection of my work
                        </SectionSubtitle>
                    </div>
                </FadeInWhenVisible>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 -mt-2 mb-7">
                    {/* Desktop buttons */}
                    <div className="hidden lg:flex flex-wrap justify-center gap-3">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.name;

                            return (
                                <motion.button
                                    key={category.name}
                                    onClick={() =>
                                        setActiveCategory(category.name)
                                    }
                                    initial={false}
                                    animate={{ y: 0, scale: 1 }}
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium border transition-colors ${
                                        isActive
                                            ? "bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:border-gray-400"
                                    }`}
                                >
                                    <motion.div
                                        animate={{ rotate: isActive ? 360 : 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Icon size={18} />
                                    </motion.div>
                                    <span>{category.name}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Dropdown for small screens */}
                    <div className="lg:hidden w-full">
                        <div className="lg:hidden">
                            <CustomDropdown
                                categories={categories}
                                selectedCategory={activeCategory}
                                setSelectedCategory={setActiveCategory}
                            />
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid max-lg:landscape:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-lg:landscape:gap-4"
                >
                    {visibleProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            isInitialLoad={isInitialLoad}
                            showAll={showAll}
                        />
                    ))}
                </motion.div>

                {filteredProjects.length > 6 && (
                    <div className="flex justify-center mt-12">
                        <motion.button
                            onClick={() => {
                                if (showAll) {
                                    document
                                        .getElementById("projects")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }
                                setShowAll((prev) => !prev);
                            }}
                            whileHover={{ y: -3, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            className="flex items-center gap-3 px-8 py-3 rounded-xl 
                       bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900
                       font-medium hover:bg-gray-800 dark:hover:bg-gray-200 
                       transition shadow-lg"
                        >
                            {showAll ? (
                                <>
                                    <span>Show less</span>
                                    <ChevronUp size={18} />
                                </>
                            ) : (
                                <>
                                    <span>View more projects</span>
                                    <ChevronDown size={18} />
                                </>
                            )}
                        </motion.button>
                    </div>
                )}

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                            No projects found in this category.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

const ProjectCard = ({
    project,
    index,
    isInitialLoad,
    showAll,
}: {
    project: any;
    index: number;
    isInitialLoad: boolean;
    showAll: boolean;
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleCardClick = (liveDemo: string | null, e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "A" || target.closest("a")) return;
        if (liveDemo) window.open(liveDemo, "_blank", "noopener,noreferrer");
    };

    const shouldAnimateInitial = isInitialLoad && index < 6;

    const shouldAnimateReveal = showAll && index >= 6;

    return (
        <motion.div
            layout
            initial={
                shouldAnimateInitial || shouldAnimateReveal
                    ? { opacity: 0, y: 24 }
                    : false
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: shouldAnimateInitial
                    ? index * 0.08 + 0.9
                    : shouldAnimateReveal
                    ? (index - 6) * 0.08
                    : 0,
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={(e) => handleCardClick(project.liveDemo, e)}
            className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border-2 transition-colors flex flex-col h-auto ${
                project.liveDemo ? "cursor-pointer" : "cursor-default"
            } border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-400`}
        >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 group-hover:border-gray-900 dark:group-hover:border-gray-400">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                />
                <div className="absolute top-4 left-4">
                    <span className="text-white text-sm font-medium px-3 py-1.5 bg-gray-900/80 dark:bg-gray-100/80 dark:text-gray-900 backdrop-blur rounded-lg">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-1">
                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug">
                    {project.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 dark:text-gray-300 text-sm font-light leading-relaxed mb-4 line-clamp-4">
                    {project.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                        <motion.span
                            key={tech}
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                            }}
                            className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className="mt-auto flex gap-2">
                    {project.liveDemo && (
                        <motion.a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                        >
                            <ExternalLink size={16} />
                            <span className="text-sm">Live Demo</span>
                        </motion.a>
                    )}

                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium border-2 transition ${
                            project.liveDemo ? "flex-none" : "flex-1"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:border-gray-900`}
                    >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
