import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";
import SectionTitle from "../ui/SectionTitle";
import SectionSubtitle from "../ui/SectionSubtitle";
import { aboutText, aboutStats } from "../../data/about";

const bounceEase = [0.34, 1.56, 0.64, 1] as any;

const About: React.FC = () => {
    // Replace these with your actual images
    const images = [
        {
            src: "src/assets/about1.webp",
            alt: "Coding workspace",
        },
        {
            src: "src/assets/about2.webp",
            alt: "Developer at work",
        },
        {
            src: "src/assets/about3.webp",
            alt: "Code on screen",
        },
        {
            src: "src/assets/about4.webp",
            alt: "Team collaboration",
        },
        {
            src: "src/assets/about5.webp",
            alt: "Tech meetup",
        },
    ];

    const spanClasses = [
        "col-span-2 row-span-3",
        "col-span-2 row-span-4",
        "col-span-2 row-span-2",
        "col-span-2 row-span-2",
        "col-span-2 row-span-1",
    ];

    return (
        <section
            id="about"
            className="2xl:min-h-screen pt-22 pb-12 flex items-center px-6 bg-white dark:bg-gray-900"
        >
            <div className="max-w-6xl mx-auto w-full">
                <FadeInWhenVisible>
                    <div className="text-center mb-8">
                        <SectionTitle>About Me</SectionTitle>
                        <SectionSubtitle>
                            Building interactive apps and websites
                        </SectionSubtitle>
                    </div>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-8 md:items-center items-start">
                    {/* Left side - Image Collage as a single 3D hover */}
                    <div className="relative group">
                        {/* Instructions (sticky, persistent) */}
                        <motion.div
                            transition={{ duration: 0.25 }}
                            className="sticky z-30 flex justify-center pointer-events-none -mt-5"
                        >
                            <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded-full text-gray-700 dark:text-gray-200 shadow-md">
                                <motion.div
                                    animate={{ x: [-5, 5, -5] }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                    }}
                                >
                                    <MousePointerClick size={20} />
                                </motion.div>
                                <span className="text-sm font-medium">
                                    Try hovering across the image!
                                </span>
                            </div>
                        </motion.div>

                        <div className="hover-3d mt-5">
                            {/* CSS Grid Collage */}
                            <div className="grid grid-cols-4 grid-rows-6 gap-2 h-112.5">
                                {images.map((img, idx) => {
                                    let rowSpan = 2,
                                        colSpan = 2;
                                    // Set specific sizes for each image
                                    if (idx === 0) {
                                        rowSpan = 3;
                                        colSpan = 2;
                                    }
                                    if (idx === 1) {
                                        rowSpan = 4;
                                        colSpan = 2;
                                    }
                                    if (idx === 2) {
                                        rowSpan = 2;
                                        colSpan = 2;
                                    }
                                    if (idx === 3) {
                                        rowSpan = 2;
                                        colSpan = 2;
                                    }
                                    if (idx === 4) {
                                        rowSpan = 1;
                                        colSpan = 2;
                                    }

                                    return (
                                        <div
                                            key={idx}
                                            className={`${spanClasses[idx]} rounded-xl overflow-hidden shadow-lg`}
                                        >
                                            <figure className="w-full h-full">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className="w-full h-full object-cover"
                                                />
                                            </figure>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 8 empty divs for the hover-3d effect */}
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                    {/* Right side - Text content */}
                    <div className="space-y-6 lg:ml-10">
                        {aboutText.map((text, idx) => (
                            <motion.p
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    ease: bounceEase,
                                    delay: 0.3 + idx * 0.2,
                                }}
                                className="text-gray-900 dark:text-gray-200 text-lg leading-relaxed font-light"
                            >
                                {text}
                            </motion.p>
                        ))}

                        {/* Stats Grid */}
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            {aboutStats.map((stat, index) => {
                                const Icon = stat.icon;
                                const [isHovered, setIsHovered] =
                                    React.useState(false);
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.8 + index * 0.08,
                                            type: "spring",
                                            stiffness: 180,
                                        }}
                                        whileHover={{
                                            y: -6,
                                            scale: 1.04,
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{
                                            y: -6,
                                            scale: 1.04,
                                            transition: { duration: 0.2 },
                                        }}
                                        onTapStart={() => setIsHovered(true)}
                                        onTapCancel={() => setIsHovered(false)}
                                        onTap={() => setIsHovered(false)}
                                        onHoverStart={() => setIsHovered(true)}
                                        onHoverEnd={() => setIsHovered(false)}
                                        className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 active:border-gray-900 dark:active:border-gray-400 hover:border-gray-900 dark:hover:border-gray-400 duration-300 cursor-pointer group"
                                    >
                                        <motion.div
                                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 group-active:bg-gray-900 dark:group-active:bg-gray-500 group-hover:bg-gray-900 dark:group-hover:bg-gray-500 transition-colors"
                                            animate={{
                                                rotate: isHovered ? 360 : 0,
                                            }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Icon
                                                size={22}
                                                className="text-gray-700 dark:text-gray-200 group-hover:text-white group-active:text-white transition-colors"
                                            />
                                        </motion.div>
                                        <div className="text-left">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-200 leading-none">
                                                {stat.number}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
