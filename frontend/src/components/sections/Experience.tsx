import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    AnimatePresence,
} from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import SectionSubtitle from "../ui/SectionSubtitle";

import experiences, { type Experience } from "../../data/experience";

const FloatingParticles: React.FC = () => {
    const particles = Array.from({ length: 20 });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-black rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: Math.random() * 0.5,
                    }}
                    animate={{
                        y: [null, Math.random() * window.innerHeight],
                        x: [null, Math.random() * window.innerWidth],
                        opacity: [null, Math.random() * 0.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const ClickParticle: React.FC<{ x: number; y: number; id: number }> = ({
    x,
    y,
}) => {
    return (
        <motion.div
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{
                opacity: 0,
                scale: 0,
                x: Math.random() * 100 - 50,
                y: -50 - Math.random() * 50,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none z-50"
            style={{ left: x, top: y }}
        >
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 drop-shadow-lg">
                +{Math.floor(Math.random() * 10) + 5}
            </div>
        </motion.div>
    );
};

const HeroSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    // Game state
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [isLevelingUp, setIsLevelingUp] = useState(false);
    const [clickParticles, setClickParticles] = useState<
        Array<{ x: number; y: number; id: number }>
    >([]);
    const [showLevelUpBurst, setShowLevelUpBurst] = useState(false);
    const [heroScale, setHeroScale] = useState(1);
    const particleIdRef = useRef(0);

    // XP requirements per level (increases exponentially)
    const getXpForLevel = (lvl: number) =>
        Math.floor(50 * Math.pow(1.5, lvl - 1));
    const maxXp = getXpForLevel(level);

    // Handle click on hero image
    const handleHeroClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Add click particle
        const newParticle = { x, y, id: particleIdRef.current++ };
        setClickParticles((prev) => [...prev, newParticle]);
        setTimeout(() => {
            setClickParticles((prev) =>
                prev.filter((p) => p.id !== newParticle.id)
            );
        }, 800);

        // Add XP
        const xpGain = Math.floor(Math.random() * 10) + 5;
        const newXp = xp + xpGain;
        const newTotalClicks = totalClicks + 1;

        setTotalClicks(newTotalClicks);

        // Pulse animation
        setHeroScale(1.1);
        setTimeout(() => setHeroScale(1), 100);

        // Check for level up
        if (newXp >= maxXp) {
            setIsLevelingUp(true);
            setShowLevelUpBurst(true);
            setXp(newXp - maxXp);
            setLevel(level + 1);

            setTimeout(() => {
                setIsLevelingUp(false);
            }, 2500);

            setTimeout(() => {
                setShowLevelUpBurst(false);
            }, 3000);
        } else {
            setXp(newXp);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="h-[calc(100vh-4rem)] flex items-center justify-center px-8 relative overflow-hidden bg-white dark:bg-gray-900"
        >
            <FloatingParticles />

            {/* Level Up Burst Effect */}
            {showLevelUpBurst && (
                <motion.div
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-radial from-gray-400 via-gray-300 to-transparent pointer-events-none z-40"
                />
            )}

            {/* Large decorative text background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 0.03 : 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
            >
                <div className="text-[20vw] font-black text-black dark:text-white leading-none">
                    {"CODE".split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.5 + i * 0.1,
                                ease: "easeOut",
                            }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Two-column layout for landscape */}
            <div className="relative z-10 w-full h-full flex flex-col landscape:flex-row landscape:items-center landscape:justify-center landscape:gap-8 px-4 md:px-8">
                {/* Experience Title - Left column in landscape */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                        opacity: isInView ? 1 : 0,
                        y: isInView ? 0 : -50,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                    className="absolute mt-4 sm:mt-10 md:mt-10 top-0 left-1/2 -translate-x-1/2 landscape:relative landscape:top-auto landscape:left-10 xl:landscape:translate-x-20 lg:landscape:translate-x-15 landscape:translate-x-0 landscape:mt-0 z-10 text-center landscape:text-left landscape:flex-1 landscape:scale-125 sm:landscape:scale-150 md:landscape:scale-[1.25] lg:landscape:scale-[2] xl:landscape:scale-[2.25] whitespace-nowrap"
                >
                    <SectionTitle>Experience</SectionTitle>
                    <SectionSubtitle>A Journey Through Code</SectionSubtitle>

                    {/* Scroll down hint for landscape */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: 1.5,
                        }}
                        className="hidden landscape:flex flex-col items-center gap-2 -mt-10 landscape:scale-[0.8] sm:landscape:scale-[0.67] md:landscape:scale-[0.57] lg:landscape:scale-[0.5] xl:landscape:scale-[0.44]"
                    >
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                            Scroll
                        </p>
                        <motion.div
                            className="w-6 h-10 border-2 border-black dark:border-white rounded-full flex items-start justify-center p-1.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.7 }}
                        >
                            <motion.div
                                className="w-1 h-2 bg-black dark:bg-white rounded-full"
                                animate={{ y: [0, 6, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Interactive Hero Game Section - Right column in landscape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 landscape:relative landscape:top-auto landscape:left-auto landscape:translate-x-0 landscape:translate-y-0 text-center z-10 max-w-4xl mx-auto landscape:flex-1 landscape:mx-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isInView ? 1 : 0,
                            scale: isInView ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        {/* Level Up Announcement */}
                        {isLevelingUp && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                            >
                                <div className="text-6xl font-black text-black dark:text-white drop-shadow-2xl animate-pulse">
                                    LEVEL UP!
                                </div>
                            </motion.div>
                        )}

                        {/* Hero Avatar Container */}
                        <div className="relative inline-block">
                            {/* Glow effect when leveling up */}
                            {isLevelingUp && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.6, 0] }}
                                    transition={{ duration: 2.5 }}
                                    className="absolute -inset-4 bg-gray-400 dark:bg-gray-500 rounded-full blur-xl"
                                />
                            )}

                            {/* Hero Image - Clickable! */}
                            <motion.div
                                className="relative cursor-pointer select-none group"
                                onClick={handleHeroClick}
                            >
                                {/* Tooltip */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-3 landscape:px-4 landscape:py-2 rounded-lg text-xs md:text-sm lg:text-base landscape:text-sm md:landscape:text-base lg:landscape:text-lg font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                >
                                    Hit Me!
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45" />
                                </motion.div>

                                {/* Hero Image */}
                                <motion.div
                                    className="relative overflow-hidden w-[50vh] h-[50vh] md:w-[60vh] md:h-[60vh] lg:w-[70vh] lg:h-[70vh] landscape:w-[60vh] landscape:h-[60vh] sm:landscape:w-[65vh] sm:landscape:h-[65vh] md:landscape:w-[70vh] md:landscape:h-[70vh] lg:landscape:w-[75vh] lg:landscape:h-[75vh] xl:landscape:w-[80vh] xl:landscape:h-[80vh] py-5 lg:py-0"
                                    animate={{ scale: heroScale }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    {/* Placeholder - Replace with your superhero images */}
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={
                                                isLevelingUp
                                                    ? "powered"
                                                    : "normal"
                                            }
                                            src={
                                                isLevelingUp
                                                    ? "src/assets/2.svg"
                                                    : "src/assets/1.svg"
                                            }
                                            alt="Hero"
                                            className="w-full h-full object-contain"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                duration: 0.2,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </AnimatePresence>
                                </motion.div>

                                {/* Level Badge */}
                                <motion.div
                                    animate={{
                                        scale: isLevelingUp ? [1, 1.3, 1] : 1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute -top-2 left-15 md:left-20 lg:left-24 lg:landscape:left-15 landscape:left-0 bg-black dark:bg-white text-white dark:text-black rounded-full w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 landscape:w-16 landscape:h-16 md:landscape:w-20 md:landscape:h-20 lg:landscape:w-24 lg:landscape:h-24 flex items-center justify-center border-3 md:border-4 lg:border-[5px] landscape:border-4 lg:landscape:border-[5px] border-white dark:border-gray-800 shadow-xl"
                                >
                                    <div className="text-center">
                                        <div className="text-[10px] md:text-sm lg:text-base landscape:text-xs md:landscape:text-sm lg:landscape:text-base font-semibold">
                                            LVL
                                        </div>
                                        <div className="text-xl md:text-3xl lg:text-4xl landscape:text-2xl md:landscape:text-3xl lg:landscape:text-4xl font-black">
                                            {level}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Click particles */}
                                {clickParticles.map((particle) => (
                                    <ClickParticle
                                        key={particle.id}
                                        x={particle.x}
                                        y={particle.y}
                                        id={particle.id}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Stats Display */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="-mt-2 landscape:-mt-8 md:landscape:-mt-10 space-y-2 landscape:space-y-3 relative -z-10"
                        >
                            {/* XP Progress Bar */}
                            <div className="max-w-xs px-5 xs:px-0 lg:max-w-md landscape:max-w-sm md:landscape:max-w-md lg:landscape:max-w-lg mx-auto">
                                <div className="flex justify-between text-[10px] lg:text-xs landscape:text-xs md:landscape:text-sm lg:landscape:text-base font-semibold mb-1 landscape:mb-1.5 text-gray-700 dark:text-gray-300">
                                    <span>
                                        XP: {xp}/{maxXp}
                                    </span>
                                    <span>
                                        {Math.floor((xp / maxXp) * 100)}%
                                    </span>
                                </div>
                                <div className="h-5 lg:h-7 landscape:h-6 md:landscape:h-7 lg:landscape:h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-2 lg:border-[3px] lg:landscape:border-[3px] border-gray-300 dark:border-gray-600 shadow-inner">
                                    <motion.div
                                        className="h-full bg-linear-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white flex items-center justify-end px-2"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${(xp / maxXp) * 100}%`,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {xp > 0 && (
                                            <span className="text-white text-[10px] lg:text-xs landscape:text-xs md:landscape:text-sm lg:landscape:text-base font-bold drop-shadow whitespace-nowrap">
                                                {xp} XP
                                            </span>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Right arrow indicator - horizontal scroll */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    delay: 1.5,
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20"
            >
                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <svg
                        className="w-8 h-8 text-black dark:text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </motion.div>
            </motion.div>

            {/* Scroll down hint at bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    delay: 1.5,
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 portrait:flex landscape:hidden flex-col items-center gap-2"
            >
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                    Scroll
                </p>
                <motion.div
                    className="w-6 h-10 border-2 border-black dark:border-white rounded-full flex items-start justify-center p-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                >
                    <motion.div
                        className="w-1 h-2 bg-black dark:bg-white rounded-full"
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

const ExperienceCard: React.FC<{
    experience: Experience;
    index: number;
    total: number;
}> = ({ experience, index, total }) => {
    // Removed isHovered state, no longer needed

    return (
        <div
            className="min-w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-20 landscape:px-4 md:landscape:px-5 lg:landscape:px-10 xl:landscape:px-13 py-4 landscape:py-1 md:landscape:py-0 relative snap-start bg-cover bg-center"
            style={{
                backgroundImage: experience.image
                    ? `url(${experience.image})`
                    : undefined,
            }}
        >
            {/* Overlay for readability: light mode = white/80, dark mode = black/80 */}
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 z-0" />
            <FloatingParticles />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-7xl w-full grid grid-cols-1 landscape:grid-cols-[120fr_1fr] gap-4 md:gap-0 lg:gap-0 landscape:gap-3 md:landscape:gap-5 lg:landscape:gap-8 xl:landscape:gap-11 items-center relative z-10"
            >
                {/* Floating period (now styled exactly as the original floating number) */}
                <motion.div
                    className="landscape:absolute relative
                                md:-top-6 lg:-top-7 landscape:-top-10 md:landscape:-top-8 lg:landscape:-top-8 xl:landscape:-top-25
                                md:-right-6 lg:-right-7 landscape:right-0 md:landscape:right-0 lg:landscape:-right-8 xl:landscape:-right-8
                                text-5xl md:text-6xl lg:text-10xl
                                landscape:text-3xl md:landscape:text-3xl lg:landscape:text-5xl xl:landscape:text-5xl
                                font-bold text-black dark:text-white leading-none"
                    initial={{ opacity: 0, rotate: -15 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {experience.period}
                </motion.div>

                {/* Content Side (full width) */}
                <motion.div
                    className="pl-0 sm:pl-7"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <h3 className="text-lg md:text-5xl lg:text-6xl landscape:text-3xl md:landscape:text-2xl lg:landscape:text-5xl xl:landscape:text-5xl [@media(min-height:670px)]:text-10xl font-bold text-black dark:text-white mb-1.5 md:mb-3 lg:mb-4 landscape:mb-1 md:landscape:mb-1.5 lg:landscape:mb-3 xl:landscape:mb-3 [@media(min-height:670px)]:mb-3 leading-tight">
                        {experience.role.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5 + i * 0.1,
                                }}
                                className="inline-block mr-3"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h3>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-base md:text-xl lg:text-2xl landscape:text-sm md:landscape:text-base lg:landscape:text-lg xl:landscape:text-lg [@media(min-height:670px)]:text-lg text-black dark:text-gray-200 font-semibold mb-2 md:mb-3 lg:mb-4 landscape:mb-1 md:landscape:mb-1.5 lg:landscape:mb-2.5 xl:landscape:mb-2.5 [@media(min-height:670px)]:mb-2.5"
                    >
                        {experience.company}
                    </motion.p>

                    <motion.div
                        className="w-16 md:w-24 lg:w-32 landscape:w-12 md:landscape:w-16 lg:landscape:w-20 xl:landscape:w-24 [@media(min-height:670px)]:w-24 h-1 bg-black dark:bg-gray-100 mb-3 md:mb-5 lg:mb-6 landscape:mb-2 md:landscape:mb-2.5 lg:landscape:mb-5 xl:landscape:mb-5.5 [@media(min-height:670px)]:mb-5.5"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    />

                    <p className="text-black dark:text-gray-200 text-sm md:text-lg lg:text-xl landscape:text-xs md:landscape:text-sm lg:landscape:text-lg xl:landscape:text-lg [@media(min-height:670px)]:text-lg mb-4 md:mb-6 lg:mb-8 landscape:mb-2 md:landscape:mb-2.5 lg:landscape:mb-6 xl:landscape:mb-7 [@media(min-height:670px)]:mb-7 leading-relaxed md:leading-relaxed lg:leading-relaxed landscape:leading-tight md:landscape:leading-snug lg:landscape:leading-relaxed xl:landscape:leading-relaxed [@media(min-height:670px)]:leading-relaxed">
                        {experience.description}
                    </p>

                    <div className="mb-4 md:mb-6 lg:mb-8 landscape:mb-2 md:landscape:mb-2.5 lg:landscape:mb-6 xl:landscape:mb-7 [@media(min-height:670px)]:mb-7">
                        <h4 className="text-xs md:text-base lg:text-lg landscape:text-[10px] md:landscape:text-xs lg:landscape:text-base xl:landscape:text-base [@media(min-height:670px)]:text-base font-semibold uppercase tracking-wide text-black dark:text-gray-100 mb-2 md:mb-4 lg:mb-5 landscape:mb-1 md:landscape:mb-1.5 lg:landscape:mb-3.5 xl:landscape:mb-3.5 [@media(min-height:670px)]:mb-3.5">
                            Key Achievements
                        </h4>
                        <ul className="space-y-1.5 md:space-y-3 lg:space-y-4 landscape:space-y-1 md:landscape:space-y-1.5 lg:landscape:space-y-2.5 xl:landscape:space-y-2.5 [@media(min-height:670px)]:space-y-2.5">
                            {experience.achievements.map((achievement, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.9 + i * 0.1,
                                    }}
                                    className="text-black dark:text-gray-200 flex items-start group cursor-default text-xs md:text-base lg:text-lg landscape:text-[10px] md:landscape:text-xs lg:landscape:text-base xl:landscape:text-base [@media(min-height:670px)]:text-base leading-snug md:leading-normal lg:leading-relaxed landscape:leading-tight md:landscape:leading-tight lg:landscape:leading-normal xl:landscape:leading-normal [@media(min-height:670px)]:leading-normal"
                                >
                                    <motion.span className="mr-2 md:mr-3 lg:mr-4 landscape:mr-1.5 md:landscape:mr-1.5 lg:landscape:mr-2.5 xl:landscape:mr-3 [@media(min-height:670px)]:mr-3 mt-1 w-2 h-2 bg-black dark:bg-gray-100 shrink-0" />
                                    <span>{achievement}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs md:text-base lg:text-lg landscape:text-[10px] md:landscape:text-xs lg:landscape:text-base xl:landscape:text-base [@media(min-height:670px)]:text-base font-semibold uppercase tracking-wide text-black dark:text-gray-100 mb-2 md:mb-4 lg:mb-5 landscape:mb-1 md:landscape:mb-1.5 lg:landscape:mb-3.5 xl:landscape:mb-3.5 [@media(min-height:670px)]:mb-3.5">
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 landscape:gap-1.5 md:landscape:gap-2 lg:landscape:gap-3 xl:landscape:gap-2.5 [@media(min-height:670px)]:gap-2.5">
                            {experience.technologies.map((tech, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.05,
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        y: -2,
                                        borderColor: "#f3f4f6",
                                    }}
                                    whileTap={{
                                        scale: 1.1,
                                        y: -2,
                                        borderColor: "#f3f4f6",
                                    }}
                                    className="px-2 md:px-4 lg:px-5 landscape:px-1.5 md:landscape:px-2 lg:landscape:px-3 xl:landscape:px-3.5 [@media(min-height:670px)]:px-3.5 py-0.5 md:py-1.5 lg:py-2 landscape:py-0.5 md:landscape:py-0.5 lg:landscape:py-1 xl:landscape:py-1 [@media(min-height:670px)]:py-1 bg-white/90 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-100 text-black dark:text-gray-100 text-xs md:text-base lg:text-lg landscape:text-[10px] md:landscape:text-xs lg:landscape:text-base xl:landscape:text-sm [@media(min-height:670px)]:text-sm font-normal rounded-lg cursor-default transition-colors"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right arrow indicator - horizontal scroll */}
            {index < total - 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20"
                >
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <svg
                            className="w-8 h-8 text-black dark:text-gray-100 "
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default function HorizontalScrollExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);
    const totalSections = experiences.length + 1; // +1 for HeroSection

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

    useEffect(() => {
        if (scrollRef.current) {
            const width =
                scrollRef.current.scrollWidth - scrollRef.current.offsetWidth;
            setScrollWidth(width);
        }

        const handleResize = () => {
            if (scrollRef.current) {
                const width =
                    scrollRef.current.scrollWidth -
                    scrollRef.current.offsetWidth;
                setScrollWidth(width);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900" id="experience">
            {/* Horizontal Scroll Section */}
            <div
                ref={containerRef}
                style={{ height: `${totalSections * 100}vh` }}
            >
                <div className="sticky top-14 h-[calc(100vh-3rem)] overflow-hidden">
                    <motion.div
                        ref={scrollRef}
                        style={{ x }}
                        className="flex h-full"
                    >
                        {/* HeroSection as first card */}
                        <div className="min-w-full h-full snap-start z-50">
                            <HeroSection />
                        </div>

                        {experiences.map((exp, index) => (
                            <ExperienceCard
                                key={index}
                                experience={exp}
                                index={index}
                                total={experiences.length}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
