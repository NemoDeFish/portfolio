export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    technologies: string[];
    achievements: string[];
    image?: string;
}

const experiences: Experience[] = [
    {
        company: "Curtin University",
        role: "Tutor",
        period: "Mar 2020 – Dec\u00A02020",
        description:
            "Tutored undergraduate engineering students, supporting coursework understanding and problem-solving skills.",
        technologies: ["C", "Python", "Engineering Mathematics"],
        achievements: [
            "Assisted students in mastering core engineering concepts",
            "Strengthened teaching, leadership, and technical communication skills",
        ],
        image: "src/assets/experience/tutor.webp",
    },
    {
        company: "Top Glove",
        role: "Automation Engineering Intern",
        period: "Dec 2021 – Feb\u00A02022",
        description:
            "Worked on automation and AI-assisted inspection systems in a large-scale manufacturing environment.",
        technologies: [
            "Python",
            "Computer Vision",
            "Automation Systems",
            "Industrial AI",
        ],
        achievements: [
            "Improved AI vision dual-bin basket accuracy by ~15%",
            "Optimized purging system to reduce defective glove issues",
            "Stabilized acid/alkaline auto top-up systems within ±10% tolerance",
        ],
        image: "src/assets/experience/topglove.webp",
    },
    {
        company: "Curtin University",
        role: "B.Eng. (Hons) Electrical & Electronic Engineering",
        period: "Jul 2019 – Jul\u00A02023",
        description:
            "Completed an honours degree focusing on engineering fundamentals and machine learning optimization.",
        technologies: [
            "Python",
            "C",
            "MATLAB",
            "Machine Learning",
            "Optimization Algorithms",
        ],
        achievements: [
            "Graduated with High Distinction (CWA: 90.31 / 100)",
            "Final Year Project: Two-phase Switching Optimization in Vision Transformer",
            "IEM Gold Medal Award for best final-year engineering student",
        ],
        image: "src/assets/experience/graduation.webp",
    },

    {
        company: "Hatch (AI)",
        role: "AI Trainer",
        period: "Jul 2025 – Aug\u00A02025",
        description:
            "Contributed to frontier AI research projects by evaluating and improving large language model performance in software engineering domains.",
        technologies: [
            "Python",
            "JavaScript",
            "Computer Science",
            "LLM Evaluation",
        ],
        achievements: [
            "Developed domain-specific prompts to evaluate and improve LLM coding accuracy and reliability",
            "Reviewed and analyzed AI-generated solutions for correctness, efficiency, and best practices",
            "Collaborated asynchronously with global AI research labs on large-scale systems projects",
        ],
        image: "src/assets/experience/llm.webp",
    },
    {
        company: "The University of Melbourne",
        role: "Master of Software Engineering (AI)",
        period: "Feb 2024 – Dec\u00A02026",
        description:
            "Postgraduate study focused on advanced software engineering, artificial intelligence, and scalable system design.",
        technologies: [
            "Java",
            "Python",
            "AI & Machine Learning",
            "Software Design Patterns",
        ],
        achievements: [
            "Recipient of 2 academic scholarships",
            "First Class Honours (WAM: 84.25 / 100)",
            "Strong focus on scalable, reliable, and AI-driven systems",
        ],
        image: "src/assets/about/about1.webp",
    },
];

export default experiences;
