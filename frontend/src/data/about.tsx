import { Code2, Lightbulb, Users, Rocket, Heart, Zap } from "lucide-react";

// --- About Section Data ---
export const aboutText = [
    <>
        I’m a graduate software engineer specializing in{" "}
        <strong className="font-bold">AI and web development</strong>, with a
        strong focus on building intelligent, user-centric applications that
        solve real problems. My work sits at the intersection of software
        engineering, machine learning, and modern web technologies.
    </>,
    <>
        I enjoy taking ideas from{" "}
        <strong className="font-bold">concept to implementation</strong>,
        whether that means developing a responsive web application, integrating
        an AI feature, or building an end-to-end system that just works.
    </>,
];

export const aboutStats = [
    { icon: Code2, number: "2+", label: "Years Experience" },
    { icon: Rocket, number: "15+", label: "Projects Completed" },
    { icon: Zap, number: "8+", label: "Languages Used" },
    { icon: Heart, number: "3+", label: "Leadership Roles" },
    {
        icon: Lightbulb,
        number: (
            <span>
                1<sup>st</sup>
            </span>
        ),
        label: "Class Honours",
    },
    { icon: Users, number: "Agile", label: "Team Experience" },
];
