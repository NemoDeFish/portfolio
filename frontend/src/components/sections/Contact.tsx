import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Send,
    User,
    MessageSquare,
    Github,
    Linkedin,
    Heart,
    ArrowUp,
    CheckCircle,
    Code,
    Phone,
    Globe,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SectionSubtitle from "../ui/SectionSubtitle";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";
import { contactInfo } from "../../data/portfolio";
import React from "react";

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        url: contactInfo.github,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: contactInfo.linkedin,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        name: "LeetCode",
        icon: Code,
        url: contactInfo.leetcode,
        gradient: "from-orange-500 to-red-500",
    },
    {
        name: "WhatsApp",
        icon: Phone,
        url: contactInfo.whatsapp,
        gradient: "from-green-500 to-emerald-500",
    },
];

const Contact = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.message) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitted(false), 3000);
        }, 1500);
    };

    return (
        <>
            {/* Contact Section */}
            <section
                id="contact"
                className="2xl:min-h-screen max-md:landscape:min-h-0 max-md:landscape:py-16 pt-22 pb-10 px-6 bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors"
            >
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.03, 0.05, 0.03],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 dark:bg-blue-700 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.03, 0.06, 0.03],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            delay: 1,
                        }}
                        className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500 dark:bg-purple-700 rounded-full blur-3xl"
                    />
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <FadeInWhenVisible>
                        <div className="text-center mb-12 max-md:landscape:mb-6">
                            {" "}
                            <SectionTitle>Get In Touch</SectionTitle>
                            <SectionSubtitle>
                                Have a project in mind? Let's work together to
                                create something amazing
                            </SectionSubtitle>
                        </div>
                    </FadeInWhenVisible>

                    <div className="grid md:grid-cols-[2fr_3fr] max-md:landscape:grid-cols-1 gap-12 max-md:landscape:gap-6">
                        {/* LEFT COLUMN */}
                        <motion.div
                            className="space-y-6 h-full flex flex-col"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div>
                                <h3 className="text-2xl max-md:landscape:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 max-md:landscape:mb-2">
                                    Let's Connect
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed lg:mb-6 max-md:landscape:mb-3 font-light max-md:landscape:text-sm">
                                    I'm always open to discussing new projects,
                                    creative ideas, or opportunities to be part
                                    of your vision.
                                </p>
                            </div>

                            {[
                                {
                                    label: "Email me at",
                                    value: contactInfo.email,
                                    icon: Mail,
                                    href: `mailto:${contactInfo.email}`,
                                },
                                {
                                    label: "Location",
                                    value: contactInfo.location,
                                    icon: Globe,
                                    href: null,
                                },
                                {
                                    label: "Call me at",
                                    value: contactInfo.phone,
                                    icon: Phone,
                                    href: `tel:${contactInfo.phone}`,
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                const [isActive, setIsActive] =
                                    React.useState(false);

                                return (
                                    <motion.a
                                        key={index}
                                        href={item.href || undefined}
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.3 + index * 0.08,
                                            type: "spring",
                                            stiffness: 180,
                                        }}
                                        whileHover={{
                                            y: -4,
                                            scale: 1.04,
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{
                                            y: -4,
                                            scale: 1.04,
                                            transition: { duration: 0.2 },
                                        }}
                                        onHoverStart={() => setIsActive(true)}
                                        onHoverEnd={() => setIsActive(false)}
                                        onTapStart={() => setIsActive(true)} // <-- mobile tap start
                                        onTapCancel={() => setIsActive(false)} // <-- mobile tap cancel
                                        onTap={() => setIsActive(false)} // <-- mobile tap end
                                        className="flex items-center gap-4 max-md:landscape:gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 max-md:landscape:p-3 active:border-gray-900 dark:active:border-gray-400 hover:border-gray-900 dark:hover:border-gray-400 duration-300 cursor-pointer group"
                                    >
                                        <motion.div
                                            className="w-12 h-12 max-md:landscape:w-10 max-md:landscape:h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 group-active:bg-gray-900 dark:group-active:bg-gray-500 group-hover:bg-gray-900 dark:group-hover:bg-gray-500 transition-colors"
                                            animate={{
                                                rotate: isActive ? 360 : 0,
                                            }} // <-- rotate on hover/tap
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Icon
                                                size={24}
                                                className="text-gray-700 dark:text-gray-200 group-hover:text-white group-active:text-white transition-colors max-md:landscape:w-5 max-md:landscape:h-5"
                                            />
                                        </motion.div>

                                        <div className="text-left min-w-0">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                {item.label}
                                            </p>
                                            <p className="text-gray-900 dark:text-gray-100 font-semibold truncate">
                                                {item.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </motion.div>

                        {/* RIGHT COLUMN */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="h-full flex flex-col"
                        >
                            <div className="space-y-4 max-md:landscape:space-y-3 flex-1">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full pl-12 pr-4 py-3 max-md:landscape:py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-gray-900 dark:focus:border-gray-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-md:landscape:text-sm"
                                            placeholder="Your name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                            size={18}
                                        />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-gray-900 dark:focus:border-gray-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <div className="relative">
                                        <MessageSquare
                                            className="absolute left-4 top-4 text-gray-400 dark:text-gray-500"
                                            size={18}
                                        />
                                        <textarea
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    message: e.target.value,
                                                })
                                            }
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-gray-900 dark:focus:border-gray-400 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                onClick={handleSubmit}
                                disabled={isSubmitting || submitted}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`mt-4 w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                                    submitted
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                                }`}
                            >
                                {isSubmitting ? (
                                    <Send size={18} />
                                ) : submitted ? (
                                    <>
                                        <CheckCircle size={18} /> Message Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} /> Send Message
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-300 py-6 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start items-center gap-8">
                        {/* Brand */}
                        <div className="md:w-[30%] text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
                                Your Name
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">
                                Building digital experiences that make a
                                difference. Let's create something amazing
                                together.
                            </p>
                        </div>

                        {/* Links and Social */}
                        <div className="md:w-[70%] flex flex-col gap-6 items-center md:items-start">
                            {/* Quick Links */}
                            <div className="text-center md:text-left">
                                <h4 className="font-semibold mb-4">
                                    Quick Links
                                </h4>

                                <ul className="flex flex-wrap justify-center md:justify-start gap-4">
                                    {[
                                        "Home",
                                        "About",
                                        "Skills",
                                        "Experience",
                                        "Projects",
                                        "Achievements",
                                        "Contact",
                                    ].map((link) => {
                                        const [isActive, setIsActive] =
                                            React.useState(false);

                                        return (
                                            <li key={link}>
                                                <motion.button
                                                    onClick={() =>
                                                        scrollToSection(
                                                            link.toLowerCase()
                                                        )
                                                    }
                                                    onTapStart={() =>
                                                        setIsActive(true)
                                                    } // mobile tap start
                                                    onTapCancel={() =>
                                                        setIsActive(false)
                                                    } // mobile tap cancel
                                                    onTap={() =>
                                                        setIsActive(false)
                                                    } // mobile tap end
                                                    whileHover={{ scale: 1.05 }} // desktop hover
                                                    whileTap={{ scale: 1.05 }} // mobile tap
                                                    className="text-gray-400 transition-colors relative group"
                                                    animate={{}} // required for motion
                                                >
                                                    {link}
                                                    <span
                                                        className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                                                            isActive
                                                                ? "w-full"
                                                                : "w-0 group-hover:w-full"
                                                        }`}
                                                    />
                                                </motion.button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Social Links */}
                            <div className="text-center md:text-left">
                                <h4 className="font-semibold mb-4">Connect</h4>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    {socialLinks.map((social) => {
                                        const [isActive, setIsActive] =
                                            React.useState(false);

                                        return (
                                            <motion.a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                // Scale on hover and tap
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 1.05 }}
                                                // Update isActive for mobile tap
                                                onTapStart={() =>
                                                    setIsActive(true)
                                                }
                                                onTapCancel={() =>
                                                    setIsActive(false)
                                                }
                                                onTap={() => setIsActive(false)}
                                                // Update isActive on desktop hover
                                                onHoverStart={() =>
                                                    setIsActive(true)
                                                }
                                                onHoverEnd={() =>
                                                    setIsActive(false)
                                                }
                                                className="group relative inline-flex items-center gap-2 px-4 h-10 bg-gray-800 border-2 border-gray-700 rounded-xl transition-all overflow-hidden"
                                            >
                                                {/* Gradient overlay */}
                                                <div
                                                    className={`absolute inset-0 bg-linear-to-r ${social.gradient} transition-opacity duration-300`}
                                                    style={{
                                                        opacity: isActive
                                                            ? 1
                                                            : 0,
                                                    }}
                                                />

                                                <social.icon
                                                    size={18}
                                                    className="text-white relative z-10"
                                                />
                                                <span className="text-white font-medium text-sm relative z-10">
                                                    {social.name}
                                                </span>
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-5 pt-3 border-t border-gray-800 gap-4 text-center md:text-left">
                        <p className="text-gray-400 text-sm flex items-center gap-1.5 font-light justify-center">
                            Made with{" "}
                            <Heart
                                size={14}
                                className="text-red-500 fill-red-500 animate-pulse"
                            />{" "}
                            © 2024 Your Name
                        </p>

                        <motion.button
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors justify-center"
                        >
                            <span>Back to top</span>
                            <ArrowUp size={16} />
                        </motion.button>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Contact;
