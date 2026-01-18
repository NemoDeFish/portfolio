export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
}

export interface Education {
    degree: string;
    school: string;
    period: string;
    description: string;
}

export interface Project {
    name: string;
    tech: string;
    description: string;
    link?: string;
}

export interface SkillGroup {
    category: string;
    skills: string[];
}

export interface Achievement {
    title: string;
    description: string;
}
