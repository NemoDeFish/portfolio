import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SectionSubtitle from "../ui/SectionSubtitle";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";
import CustomDropdown from "../ui/CustomDropdown";
import { skillsData, categories, type Skill } from "../../data/skills";
import { ChevronDown, ChevronUp } from "lucide-react";

function useTallScreen(threshold = 430) {
    const [isTall, setIsTall] = useState(
        typeof window !== "undefined" && window.innerHeight > threshold
    );

    useEffect(() => {
        const onResize = () => {
            setIsTall(window.innerHeight > threshold);
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [threshold]);

    return isTall;
}

const Skills: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const isTallScreen = useTallScreen(430);

    const allCategorySkills = React.useMemo(() => {
        return Object.entries(skillsData)
            .filter(([category]) => category !== "All")
            .flatMap(([, skills]) => skills)
            .filter(
                (skill, index, self) =>
                    index === self.findIndex((s) => s.name === skill.name)
            );
    }, []);

    const allSkills = React.useMemo(() => {
        const source =
            selectedCategory === "All"
                ? allCategorySkills
                : skillsData[selectedCategory] || [];

        return source.filter((skill) =>
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [selectedCategory, searchTerm, allCategorySkills]);

    const allFeaturedPool = React.useMemo(() => {
        const curated = skillsData["All"] || [];

        const categoryExperts = Object.entries(skillsData)
            .filter(([category]) => category !== "All")
            .flatMap(([, skills]) =>
                skills.filter((skill) => skill.proficiency === "Expert")
            );

        // Deduplicate by name
        const map = new Map<string, Skill>();
        [...curated, ...categoryExperts].forEach((skill) => {
            map.set(skill.name, skill);
        });

        return Array.from(map.values());
    }, []);

    const featuredSkills = React.useMemo(() => {
        if (selectedCategory === "All") {
            return allFeaturedPool
                .filter((skill) =>
                    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 2);
        }

        return (skillsData[selectedCategory] || [])
            .filter(
                (skill) =>
                    skill.proficiency === "Expert" &&
                    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 2);
    }, [selectedCategory, searchTerm, allFeaturedPool]);

    const learningSkills = allSkills.filter(
        (skill) => skill.proficiency === "Learning"
    );

    const regularSkills = allSkills.filter(
        (skill) => skill.proficiency !== "Learning"
    );

    const [showAllSkills, setShowAllSkills] = useState(false);

    const SKILLS_LIMIT = 12;

    const visibleRegularSkills =
        !isTallScreen && !showAllSkills
            ? regularSkills.slice(0, SKILLS_LIMIT)
            : regularSkills;

    const visibleLearningSkills =
        !isTallScreen && !showAllSkills
            ? learningSkills.slice(0, SKILLS_LIMIT)
            : learningSkills;

    return (
        <section
            id="skills"
            className={`
                ${isTallScreen ? "h-screen" : "h-auto"}
                px-6 pt-24 pb-8
                bg-gray-50 dark:bg-gray-950
                transition-colors flex flex-col
            `}
        >
            <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 min-h-0">
                <FadeInWhenVisible delay={0.5}>
                    <SectionTitle>Skills & Expertise</SectionTitle>
                    <SectionSubtitle>Technologies I work with</SectionSubtitle>
                </FadeInWhenVisible>

                <div className=" flex flex-col lg:grid lg:grid-cols-4 gap-0 lg:gap-8 flex-1 min-h-0">
                    {/* LEFT SIDEBAR */}
                    <div className="lg:col-span-1 space-y-6 landscape:space-y-3 border-gray-200 dark:border-gray-700 border-0 lg:border-r lg:pr-8">
                        {/* Search */}
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
                                size={18}
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search skills..."
                                className="w-full pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-gray-900 dark:focus:border-gray-400 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                        </div>

                        {/* Categories for large screens */}
                        <div className="hidden lg:flex flex-col gap-2">
                            {categories.map(({ icon: Icon, name }) => (
                                <motion.button
                                    key={name}
                                    onClick={() => setSelectedCategory(name)}
                                    whileTap={{ scale: 0.97 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        selectedCategory === name
                                            ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-400"
                                    }`}
                                >
                                    <Icon size={16} />
                                    {name}
                                </motion.button>
                            ))}
                        </div>

                        {/* Dropdown for small screens */}
                        <div className="lg:hidden">
                            <div className="lg:hidden mb-5">
                                <CustomDropdown
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div
                        ref={scrollRef}
                        className="lg: col-span-3 overflow-y-auto pr-2 h-full"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-10 pb-4"
                            >
                                {/* FEATURED */}
                                {featuredSkills.length > 0 && (
                                    <div className="space-y-4 lg:pt-0 pt-5">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
                                            Featured
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 max-md:landscape:grid-cols-2 gap-6">
                                            {featuredSkills.map(
                                                (skill, index) => (
                                                    <FeaturedSkillCard
                                                        key={skill.name}
                                                        skill={skill}
                                                        index={index}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* REGULAR SKILLS */}
                                {regularSkills.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
                                            Skills
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:landscape:grid-cols-3 gap-3">
                                            {visibleRegularSkills.map(
                                                (skill, index) => (
                                                    <SkillCard
                                                        key={skill.name}
                                                        skill={skill}
                                                        index={index}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* LEARNING */}
                                {learningSkills.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
                                            Currently Learning
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md: landscape:grid-cols-3 gap-3">
                                            {visibleLearningSkills.map(
                                                (skill, index) => (
                                                    <SkillCard
                                                        key={skill.name}
                                                        skill={skill}
                                                        index={index}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {!isTallScreen &&
                                    regularSkills.length +
                                        learningSkills.length >
                                        SKILLS_LIMIT && (
                                        <div className="flex justify-center pt-6">
                                            <motion.button
                                                onClick={() => {
                                                    if (showAllSkills) {
                                                        document
                                                            .getElementById(
                                                                "skills"
                                                            )
                                                            ?.scrollIntoView({
                                                                behavior:
                                                                    "smooth",
                                                            });
                                                    }
                                                    setShowAllSkills(
                                                        (prev) => !prev
                                                    );
                                                }}
                                                whileHover={{
                                                    y: -2,
                                                    scale: 1.05,
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                }}
                                                className="flex items-center gap-2 px-6 py-2 rounded-xl
                           bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900
                           font-medium hover:bg-gray-800 dark:hover:bg-gray-200
                           transition shadow-md"
                                            >
                                                {showAllSkills ? (
                                                    <>
                                                        <span>Show less</span>
                                                        <ChevronUp size={18} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>
                                                            Show more skills
                                                        </span>
                                                        <ChevronDown
                                                            size={18}
                                                        />
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    )}

                                {allSkills.length === 0 && (
                                    <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
                                        No skills found matching "{searchTerm}"
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* =======================
   FEATURED CARD
======================= */
const FeaturedSkillCard = ({ skill, index }: { skill: any; index: number }) => {
    const Logo = skill.logo;
    const bannerColor = skill.bannerColor || "from-purple-500 to-pink-500";
    const label = skill.label;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ y: -4, transition: { duration: 0.2 } }}
            className="group rounded-xl overflow-hidden cursor-pointer shadow-lg border-2 border-gray-300 dark:border-gray-700"
        >
            <div
                className={`h-36 w-full flex items-center justify-center bg-linear-to-br ${bannerColor} relative`}
            >
                {Logo &&
                    (typeof Logo === "string" ? (
                        <img
                            src={Logo}
                            alt={skill.name}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <Logo className="text-white w-16 h-16 z-10" />
                    ))}
                <span className="absolute bottom-2 left-2 text-xs font-semibold text-white bg-black/80 px-2 py-1 rounded">
                    {label}
                </span>
            </div>

            <div className="p-4 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {skill.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {skill.description}
                </p>
            </div>
        </motion.div>
    );
};

/* =======================
   REGULAR CARD
======================= */
const SkillCard = ({ skill }: { skill: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.05,
                type: "spring",
                stiffness: 300,
                damping: 25,
            }}
            className="rounded-lg p-3 border cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:active:border-gray-400 active:border-gray-900 dark:hover:border-gray-400 transition-colors"
        >
            <div className="flex items-center gap-2 mb-1">
                {skill.logo &&
                    (typeof skill.logo === "string" ? (
                        <img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-5 h-5 object-contain"
                        />
                    ) : (
                        <skill.logo className="w-5 h-5" color={skill.color} />
                    ))}

                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {skill.name}
                </h4>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug line-clamp-2">
                {skill.description}
            </p>
        </motion.div>
    );
};

export default Skills;
