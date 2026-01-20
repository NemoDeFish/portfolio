import { Mail, Github, Linkedin, Code } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// --- Hero Section Data ---
export const name = "Si Yong";

export const description =
    "Based in Victoria, Australia, I design and build interactive software and websites, focused on creating experiences people genuinely enjoy using.";

export const contactInfo = {
    email: "siyong_lim@hotmail.com",
    location: "Victoria, Australia",
    phone: "+61 0431 846 644",
    github: "https://github.com/NemoDeFish",
    linkedin: "https://www.linkedin.com/in/si-yong-lim/",
    leetcode: "https://leetcode.com/u/nemodefish/",
    whatsapp: "https://wa.me/60168400877",
};

export const socials = [
    {
        Icon: Mail,
        href: `mailto:siyong_lim@hotmail.com`,
        label: "Email",
        bg: "bg-gray-900 dark:bg-white",
        gradient: "from-blue-400 to-indigo-500",
    },
    {
        Icon: Github,
        href: contactInfo.github,
        label: "GitHub",
        bg: "bg-gray-800 dark:bg-gray-200",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        Icon: Linkedin,
        href: contactInfo.linkedin,
        label: "LinkedIn",
        bg: "bg-gray-700 dark:bg-gray-400",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        Icon: Code,
        href: contactInfo.leetcode,
        label: "LeetCode",
        bg: "bg-gray-600 dark:bg-gray-500",
        gradient: "from-orange-500 to-red-500",
    },
    {
        Icon: FaWhatsapp,
        href: contactInfo.whatsapp,
        label: "WhatsApp",
        bg: "bg-gray-400 dark:bg-gray-700",
        gradient: "from-green-500 to-emerald-500",
    },
];
