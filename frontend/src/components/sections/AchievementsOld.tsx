import { useState, useRef, useEffect } from "react";
import {
    motion,
    useMotionValue,
    useAnimationFrame,
    useTransform,
} from "framer-motion";
import {
    Trophy,
    Star,
    Award,
    Zap,
    Medal,
    Target,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    MousePointerClick,
} from "lucide-react";

import FadeInWhenVisible from "../animations/FadeInWhenVisible";
import SectionTitle from "../ui/SectionTitle";
import SectionSubtitle from "../ui/SectionSubtitle";
import { achievementsData as rawAchievementsData } from "../../data/achievements";

const categoryColors: Record<string, string> = {
    Competition: "bg-yellow-400 text-yellow-900",
    Community: "bg-purple-400 text-purple-900",
    Certification: "bg-blue-400 text-cyan-900",
    Speaking: "bg-green-400 text-green-900",
    Writing: "bg-red-400 text-rose-900",
    Leadership: "bg-indigo-400 text-purple-900",
};

// Map icon string to Lucide icon component
const iconMap = {
    Trophy,
    Star,
    Award,
    Zap,
    Medal,
    Target,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    MousePointerClick,
};

const achievementsData = rawAchievementsData.map((item) => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || Trophy,
}));

export default function AchievementsCarousel() {
    const repeatedData = [
        ...achievementsData,
        ...achievementsData,
        ...achievementsData,
    ];
    const x = useMotionValue(0);
    const [speed, setSpeed] = useState(40);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(1000);

    const cardWidth = 320;
    const gap = 24;
    const totalCardWidth = cardWidth + gap;
    const singleSetWidth = achievementsData.length * totalCardWidth;

    useEffect(() => {
        const update = () => {
            if (containerRef.current)
                setContainerWidth(containerRef.current.offsetWidth);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const centerOffset =
                -singleSetWidth + containerWidth / 2 - cardWidth / 2;
            x.set(centerOffset);
        }
    }, [containerWidth]);

    useAnimationFrame((_t, delta) => {
        if (speed === 0) return;
        let next = x.get() - (speed * delta) / 1000;
        if (next <= -singleSetWidth * 2) next += singleSetWidth;
        if (next >= -singleSetWidth) next -= singleSetWidth;
        x.set(next);
    });

    function useTallScreen(threshold = 430) {
        const [isTall, setIsTall] = useState(
            typeof window !== "undefined" && window.innerHeight > threshold,
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

    const isTallScreen = useTallScreen(430);

    return (
        <section
            id="achievements"
            className="2xl:min-h-screen relative overflow-hidden pt-22 pb-20 bg-white dark:bg-gray-900 transition-colors"
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <FadeInWhenVisible>
                    <SectionTitle>Achievements & Certifications</SectionTitle>
                    <SectionSubtitle>
                        Recognition across competitions, leadership, writing,
                        speaking, and certifications
                    </SectionSubtitle>
                </FadeInWhenVisible>

                {/* Instructions */}
                <motion.div
                    transition={{ duration: 0.25 }}
                    className="sticky top-24 z-30 flex justify-center pointer-events-none -mt-3 mb-11 px-2"
                >
                    <div className="flex flex-wrap items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 py-2 rounded-full text-gray-700 dark:text-gray-200 shadow-md">
                        <motion.div
                            animate={{ x: [-5, 5, -5] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            <MousePointerClick size={20} />
                        </motion.div>
                        <span className="text-sm font-medium text-center">
                            Drag to explore or sit back and watch
                        </span>
                        <ChevronLeft size={18} />
                        <ChevronRight size={18} />
                    </div>
                </motion.div>

                {/* Carousel */}
                <div ref={containerRef}>
                    <motion.div
                        style={{ x }}
                        drag="x"
                        dragElastic={0.2}
                        onDragEnd={() => setSpeed(40)}
                        className="flex gap-6 relative cursor-grab active:cursor-grabbing"
                    >
                        {repeatedData.map((achievement, idx) => {
                            const cardCenter =
                                idx * totalCardWidth + cardWidth / 2;

                            const scale = useTransform(
                                x,
                                [
                                    -cardCenter + containerWidth / 2 - 300,
                                    -cardCenter + containerWidth / 2,
                                    -cardCenter + containerWidth / 2 + 300,
                                ],
                                [0.85, 1.08, 0.85],
                            );

                            const opacity = useTransform(
                                x,
                                [
                                    -cardCenter + containerWidth / 2 - 400,
                                    -cardCenter + containerWidth / 2,
                                    -cardCenter + containerWidth / 2 + 400,
                                ],
                                [0.5, 1, 0.5],
                            );

                            const isActive = useTransform(
                                scale,
                                (s) => s > 0.98,
                            );

                            return (
                                <motion.div
                                    key={idx}
                                    style={{ scale, opacity }}
                                    className={`min-w-[320px] ${
                                        isTallScreen
                                            ? "h-auto"
                                            : "h-[calc(90vh-60px)]"
                                    } rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col bg-white dark:bg-gray-800 active:border-gray-900 dark:active:border-gray-300 hover:border-gray-900 dark:hover:border-gray-300 transition-colors duration-300 will-change-transform`}
                                >
                                    {/* Image + spotlight */}
                                    <div className="relative h-48 max-lg:landscape:h-40 shrink-0 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden contain-paint">
                                        <div className="absolute inset-0 hidden sm:block">
                                            <motion.div
                                                animate={
                                                    isActive.get()
                                                        ? {
                                                              opacity: [
                                                                  0.3, 0.6, 0.3,
                                                              ],
                                                              scale: [
                                                                  1, 1.2, 1,
                                                              ],
                                                          }
                                                        : { opacity: 0 }
                                                }
                                                transition={{
                                                    duration: 3.5,
                                                    repeat: isActive.get()
                                                        ? Infinity
                                                        : 0,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-64 blur-2xl"
                                                style={{
                                                    background:
                                                        "radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)",
                                                }}
                                            />
                                        </div>

                                        <img
                                            src={achievement.image}
                                            alt={achievement.title}
                                            draggable={false}
                                            className="pointer-events-none relative z-10 w-full h-full object-contain p-5 max-lg:landscape:p-2 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                                        />

                                        <span
                                            className={`absolute top-3 right-3 text-xs max-lg:landscape:text-[10px] font-medium px-3 py-1.5 max-lg:landscape:px-2 max-lg:landscape:py-1 rounded-full shadow-lg z-20 ${
                                                categoryColors[
                                                    achievement.category
                                                ]
                                            }`}
                                        >
                                            {achievement.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 pt-3 max-lg:landscape:p-3 max-lg:landscape:pt-2 flex flex-col flex-1">
                                        <h3 className="text-lg max-lg:landscape:text-base font-bold text-gray-900 dark:text-gray-100 mb-1 max-lg:landscape:mb-0.5">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-sm max-lg:landscape:text-xs text-gray-600 dark:text-gray-300 mb-2 max-lg:landscape:mb-1 font-medium">
                                            {achievement.subtitle}
                                        </p>
                                        <p className="text-sm max-lg:landscape:text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed max-lg:landscape:leading-snug font-light mb-3 max-lg:landscape:mb-1.5 line-clamp-3 max-lg:landscape:line-clamp-2">
                                            {achievement.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-3 max-lg:landscape:pt-2 border-t border-gray-100 dark:border-gray-700">
                                            <span className="text-xs max-lg:landscape:text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                                                {achievement.date}
                                            </span>

                                            {achievement.link && (
                                                <motion.a
                                                    href={achievement.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    whileHover={{
                                                        scale: 1.05,
                                                        y: -2,
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    transition={{
                                                        duration: 0.15,
                                                    }}
                                                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 max-lg:landscape:px-2 max-lg:landscape:py-1 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-medium active:bg-gray-800 dark:active:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-600 shadow-md text-sm max-lg:landscape:text-[11px]"
                                                >
                                                    <ExternalLink
                                                        size={14}
                                                        className="max-lg:landscape:w-3 max-lg:landscape:h-3"
                                                    />
                                                    <span>View</span>
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className={`h-1 bg-linear-to-r ${achievement.color}`}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
