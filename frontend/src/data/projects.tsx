import { Globe, Monitor, Cpu, Sparkles, Shield } from "lucide-react";

export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    tech: string[];
    image: string;
    liveDemo: string | null;
    github: string;
}

export const projectsData: Project[] = [
    {
        id: "digital-bricks-management-system",
        title: "Digital Bricks CMS",
        description:
            "Web-based management system for tracking and organizing digital assets, providing CRUD operations, role-based access, and reporting features.",
        category: "Web",
        tech: ["Spring Boot", "MySQL", "React", "PostgreSQL"],
        image: "src/assets/projects/dbms.webp",
        liveDemo: null,
        github: "https://github.com/NemoDeFish/Digital-Bricks-Management-System",
    },
    {
        id: "cybersecurity-incident-ml-analysis",
        title: "Cybersecurity Incident ML Analysis",
        description:
            "Machine learning analysis of enterprise security telemetry to identify key factors influencing accurate incident classification.",
        category: "AI",
        tech: ["Python", "Machine Learning", "Data Analysis", "Security"],
        image: "src/assets/projects/cybersecurity.webp",
        liveDemo: null,
        github: "https://github.com/NemoDeFish/cybersecurity-incident-ml-analysis",
    },
    {
        id: "collab-canvas",
        title: "CollabCanvas",
        description:
            "Real-time collaborative drawing application that allows multiple users to interact with a shared whiteboard over a network.",
        category: "Desktop",
        tech: ["Java", "Networking", "Concurrency", "Client-Server", "Swing"],
        image: "src/assets/projects/collab_canvas.webp",
        liveDemo: "/CollabCanvas.zip",
        github: "https://github.com/NemoDeFish/collab-canvas",
    },
    {
        id: "monte-carlo-tree-search-agent-tetress",
        title: "Monte Carlo Tree Search Tetress Agent",
        description:
            "AI agent using Monte Carlo Tree Search to optimize gameplay strategy in Tetress.",
        category: "AI",
        tech: ["Python", "AI", "MCTS", "FastAPI", "React"],
        image: "src/assets/projects/playground.webp",
        liveDemo: "http://localhost:5173/mcts-tetress/",
        github: "https://github.com/NemoDeFish/monte-carlo-tree-search-agent-tetress",
    },
    {
        id: "sqlite-vulnerability-discovery",
        title: "SQLite Vulnerability Discovery",
        description:
            "Security-focused fuzzing project that discovers real memory safety and denial-of-service vulnerabilities in SQLite v3.31 using coverage-guided fuzzing and custom AFL++ mutators.",
        category: "Security",
        tech: [
            "C",
            "AFL++",
            "Fuzzing",
            "AddressSanitizer",
            "MemorySanitizer",
            "Docker",
            "GNU Make",
        ],
        image: "src/assets/projects/security.webp",
        liveDemo: null,
        github: "https://github.com/NemoDeFish/sqlite-vulnerability-discovery",
    },
    {
        id: "customer-loyalty-pos-sync",
        title: "Customer Loyalty POS Sync",
        description:
            "System to sync loyalty points from MySQL POS database to MongoDB in real-time using Python and React.",
        category: "Web",
        tech: ["Python", "React", "MongoDB", "MySQL"],
        image: "src/assets/projects/loyalty.webp",
        liveDemo: "https://loyalty-app-uccv.onrender.com/",
        github: "https://github.com/NemoDeFish/customer-loyalty-pos-sync",
    },
    {
        id: "a-star-search-for-single-player-tetress",
        title: "A* Search Solver Tetress Agent",
        description:
            "A* search-based solver for Tetress to find optimal piece placements and maximize token elimination.",
        category: "AI",
        tech: ["Python", "A* Search", "AI", "FastAPI", "React"],
        image: "src/assets/projects/playground.webp",
        liveDemo: "http://localhost:5173/astar-tetress/",
        github: "https://github.com/NemoDeFish/a-star-search-for-single-player-tetress",
    },
    {
        id: "urban-sound-ml-analysis",
        title: "Urban Sound Classification",
        description:
            "Exploration of classical machine learning techniques for urban sound classification using features from the UrbanSound8K dataset.",
        category: "AI",
        tech: [
            "Python",
            "Machine Learning",
            "Audio Processing",
            "Data Science",
        ],
        image: "src/assets/projects/ml.webp",
        liveDemo: null,
        github: "https://github.com/NemoDeFish/urban-sound-ml-analysis",
    },
    {
        id: "vit-two-phase-switching-opt",
        title: "Two-phase Switching Optimization in Vision Transformer",
        description:
            "Exploring optimization techniques in Vision Transformers for efficient computation and improved model performance.",
        category: "AI",
        tech: ["PyTorch", "Computer Vision", "Deep Learning"],
        image: "src/assets/projects/vit.webp",
        liveDemo: null,
        github: "https://github.com/NemoDeFish/vit-two-phase-switching-opt",
    },
    {
        id: "web-proxy",
        title: "Web Proxy",
        description:
            "Lightweight web proxy server that handles HTTP requests and responses, allowing request interception and modification for testing or security purposes.",
        category: "Web",
        tech: ["Node.js", "JavaScript", "HTTP", "Networking"],
        image: "src/assets/projects/proxy.webp",
        liveDemo: null,
        github: "https://github.com/NemoDeFish/web-proxy",
    },
    {
        id: "dictionary-client-server-application",
        title: "Multi-threaded Dictionary Server",
        description:
            "Client–server dictionary application supporting concurrent clients with thread-safe request handling and persistent storage.",
        category: "Desktop",
        tech: ["Java", "Concurrency", "Sockets", "Thread Safety", "JSON"],
        image: "src/assets/projects/dictionary_client_server.webp",
        liveDemo:
            "https://github.com/NemoDeFish/dictionary-client-server-application/releases/download/v1.0.0/DictionaryClientServerApplication.zip",
        github: "https://github.com/NemoDeFish/dictionary-client-server-application",
    },
    {
        id: "hifive-card-game",
        title: "HiFive Card Game",
        description:
            "Digital card game built with Java featuring AI player behavior and OOP design principles.",
        category: "Desktop",
        tech: ["Java", "Game Development", "OOP", "Java2D", "AI"],
        image: "src/assets/projects/hifive-gameplay.webp",
        liveDemo: "/HiFive.zip",
        github: "https://github.com/NemoDeFish/hifive-card-game",
    },
    {
        id: "shadow-mario",
        title: "Shadow Mario",
        description:
            "2D platformer game inspired by Mario, featuring custom levels, collision detection, and smooth player controls.",
        category: "Desktop",
        tech: ["Java", "Game Development", "Java2D", "OOP"],
        image: "src/assets/projects/gameplay.webp",
        liveDemo: "/ShadowMario.zip",
        github: "https://github.com/NemoDeFish/shadow-mario",
    },
    {
        id: "portfolio",
        title: "Software Engineering Portfolio",
        description:
            "A central portfolio showcasing my projects across software engineering, security, AI, and web development, highlighting practical skills and technical breadth.",
        category: "Web",
        tech: ["React", "TypeScript", "JavaScript", "UI/UX"],
        image: "src/assets/projects/portfolio.webp",
        liveDemo: null, // replace with your live link if available
        github: "https://github.com/NemoDeFish/portfolio",
    },
];

export const categories = [
    { name: "All", icon: Sparkles },
    { name: "Web", icon: Globe },
    { name: "Desktop", icon: Monitor },
    { name: "AI", icon: Cpu },
    { name: "Security", icon: Shield },
];
