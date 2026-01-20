import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Send, FileText } from "lucide-react";
import TypingEffect from "../animations/TypingEffect";
import { name, description, socials } from "../../data/hero";

const bounceEase = [0.34, 1.56, 0.64, 1] as any;

/* Magnetic wrapper */
const Magnetic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);
        x.set(offsetX * 0.15);
        y.set(offsetY * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
};

const Hero: React.FC = () => {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="min-h-screen md:landscape:min-h-screen xl:landscape:min-h-0 2xl:min-h-screen md:min-h-0
            xs:landscape:pt-30 2xl:landscape:pt-23 landscape:pt-20 lg:landscape:pt-10 xl:landscape:pt-30
            flex items-center justify-center px-6 md:pt-30 pt-19
      bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900
      transition-colors"
        >
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex flex-col items-center text-center space-y-7">
                    {/* Avatar */}
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: bounceEase,
                            delay: 0.2,
                        }}
                        whileTap={{ scale: 1.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-48 h-48 rounded-full p-1
              bg-linear-to-br from-gray-300 via-gray-400 to-gray-300
              dark:from-gray-700 dark:via-gray-800 dark:to-gray-700
              shadow-2xl transition-colors"
                    >
                        <img
                            src="/assets/hero/avatar.webp"
                            alt={name}
                            className="w-full h-full object-cover rounded-full object-top"
                        />
                    </motion.div>

                    {/* Greeting */}
                    <motion.h3
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.7,
                            ease: bounceEase,
                            delay: 0.35,
                        }}
                        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 -mt-2"
                    >
                        Hi! I’m {name}
                    </motion.h3>

                    {/* Job Role with Typing Effect */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: bounceEase,
                            delay: 0.55,
                        }}
                        className="relative p-0.5 -mt-4 rounded-xl
              bg-linear-to-r from-gray-300 via-gray-400 to-gray-300
              dark:from-gray-700 dark:via-gray-500 dark:to-gray-700 animate-gradient-x"
                    >
                        <Magnetic>
                            <div
                                className="
                                        px-3 w-full h-full rounded-xl
                                        bg-linear-to-br from-gray-50 via-gray-100 to-gray-50
                                        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                                        shadow-lg hover:shadow-xl transition-shadow
                                        min-h-10 md:min-h-14 lg:min-h-18 xl:min-h-22
                                    "
                            >
                                <TypingEffect
                                    words={[
                                        "Software Engineer",
                                        "AI Engineer",
                                        "Web Developer",
                                    ]}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-100 text-center"
                                />
                            </div>
                        </Magnetic>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.75 }}
                        className="text-base md:text-lg -mt-2 text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
                    >
                        {description}
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        // More granular control:
                        className="flex gap-3 flex-wrap justify-center items-center max-w-full sm:max-w-md md:max-w-3xl"
                    >
                        {socials.map((social, index) => {
                            // Determine text color based on background brightness
                            // Light backgrounds in dark mode → use dark text
                            // Dark backgrounds → use white text
                            const textClass =
                                social.bg.includes("dark:bg-white") ||
                                social.bg.includes("dark:bg-gray-200") ||
                                social.bg.includes("dark:bg-gray-400")
                                    ? "dark:text-gray-900 text-white" // bright bg → dark text in dark mode
                                    : "text-white"; // dark bg → white text

                            return (
                                <motion.a
                                    key={index}
                                    href={social.href ?? "#"}
                                    target={
                                        social.href?.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        social.href?.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 ${social.bg} rounded-full px-3 py-2
          hover:bg-black dark:hover:bg-gray-200 transition-all shadow-md ${textClass}
          h-10`}
                                >
                                    {social.Icon ? (
                                        <social.Icon
                                            size={20}
                                            className={textClass}
                                        />
                                    ) : (
                                        <span
                                            className={`text-lg ${textClass}`}
                                        >
                                            {social.Icon}
                                        </span>
                                    )}
                                    <span
                                        className={`font-medium text-sm ${textClass}`}
                                    >
                                        {social.label}
                                    </span>
                                </motion.a>
                            );
                        })}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: bounceEase,
                            delay: 1.1,
                        }}
                        className="flex gap-4 justify-center pt-1"
                    >
                        <motion.button
                            onClick={() => scrollToSection("contact")}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="
    w-36 h-10 sm:w-44 sm:h-12
    bg-gray-900 dark:bg-gray-100
    text-white dark:text-gray-900
    rounded-lg font-medium
    hover:shadow-lg transition-all
    flex items-center justify-center gap-2
  "
                        >
                            <Send size={18} />
                            Contact
                        </motion.button>

                        <motion.a
                            href="/Resume_Si Yong Lim.pdf"
                            download
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="
    w-36 h-10 sm:w-44 sm:h-12
    border-2 border-gray-300 dark:border-gray-700
    text-gray-700 dark:text-gray-300
    rounded-lg font-medium
    hover:shadow-lg transition-all
    flex items-center justify-center gap-2
  "
                        >
                            <FileText size={18} />
                            Resume
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
