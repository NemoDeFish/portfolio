import type { Experience, Education, Project, SkillGroup } from "../types";

export const contactInfo = {
    email: "siyong_lim@hotmail.com",
    location: "Victoria, Australia",
    phone: "+61 0431 846 644",
    github: "https://github.com/NemoDeFish",
    linkedin: "https://www.linkedin.com/in/si-yong-lim/",
    leetcode: "https://leetcode.com/u/nemodefish/",
    whatsapp: "https://wa.me/60168400877",
};

export const skillGroups: SkillGroup[] = [
    {
        category: "Frontend",
        skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
        category: "Backend",
        skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
    },
    {
        category: "Tools & Others",
        skills: ["Git", "Docker", "AWS", "CI/CD", "Agile"],
    },
];

export const experiences: Experience[] = [
    {
        title: "Senior Full Stack Developer",
        company: "Tech Company",
        period: "2022 - Present",
        description:
            "Led development of multiple high-impact projects, mentored junior developers, and implemented best practices across the team.",
    },
    {
        title: "Full Stack Developer",
        company: "Startup Inc.",
        period: "2020 - 2022",
        description:
            "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver features.",
    },
    {
        title: "Junior Developer",
        company: "Digital Agency",
        period: "2018 - 2020",
        description:
            "Built responsive websites and web applications. Gained experience in modern web technologies and agile methodologies.",
    },
];

export const education: Education[] = [
    {
        degree: "Bachelor of Science in Computer Science",
        school: "University Name",
        period: "2014 - 2018",
        description:
            "Focused on software engineering, algorithms, and data structures. Graduated with honors.",
    },
    {
        degree: "Bachelor of Science in Computer Science",
        school: "University Name",
        period: "2014 - 2018",
        description:
            "Focused on software engineering, algorithms, and data structures. Graduated with honors.",
    },
];

export const projects: Project[] = [
    {
        name: "E-Commerce Platform",
        tech: "React, Node.js, MongoDB",
        description:
            "Full-featured online shopping platform with payment integration",
    },
    // Add more...
];

export const achievements = [
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        description:
            "Demonstrated foundational knowledge of AWS cloud services, security, and architecture.",
    },
    {
        title: "Winner – Hackathon 2024",
        issuer: "Global Tech Fest",
        description:
            "Led a team to build an AI-powered accessibility tool, awarded first place among 120 teams.",
    },
];
