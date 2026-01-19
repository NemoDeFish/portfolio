// Achievements data for portfolio
// Move icon imports to the component file, use string keys here

const categoryColorMap: Record<string, string> = {
    Competition: "from-yellow-400 to-orange-500",
    Academic: "from-blue-400 to-cyan-500",
    Speaking: "from-red-400 to-rose-500",
    Certification: "from-blue-500 to-cyan-600",
    Leadership: "from-green-500 to-emerald-600",
    Languages: "from-blue-700 to-indigo-800",
};

const rawAchievementsData = [
    // Academic
    {
        id: "iem-gold-medal",
        title: "IEM Gold Medal Award",
        subtitle: "Institute of Engineers Malaysia",
        description:
            "Given to the top final-year engineering student. Honed my technical expertise and leadership among peers.",
        date: "2023",
        category: "Academic",
        image: "src/assets/achievements/iem-gold-medal.jpg",
    },
    {
        id: "curtin-scholarship",
        title: "Curtin Malaysia Scholarship",
        subtitle: "Curtin University Malaysia",
        description: "Scholarship for academic excellence.",
        date: "2020-2023",
        category: "Academic",
        image: "src/assets/achievements/curtin-scholarship.jpg",
    },
    {
        id: "eng-it-scholarship",
        title: "Engineering and IT Graduate Scholarship",
        subtitle: "University of Melbourne",
        description:
            "Recognizes outstanding achievement in engineering and IT.",
        date: "2024-2025",
        category: "Academic",
        image: "src/assets/achievements/eng-it-scholarship.jpg",
    },
    {
        id: "john-balfour-scholarship",
        title: "John Balfour’s Memorial Scholarship",
        subtitle: "University of Melbourne",
        description:
            "For academic achievement and leadership. Motivated me to lead and inspire others in my field.",
        date: "2025-2026",
        category: "Academic",
        image: "src/assets/achievements/john-balfour-scholarship.jpg",
    },
    {
        id: "publication-deep-learning",
        title: "2nd Derivative Optimization Methods in DNNs",
        subtitle: "Publication at GECOST Conference",
        description:
            "Published research on deep learning optimization. Sharpened my analytical and scientific writing skills.",
        date: "2023",
        category: "Academic",
        image: "src/assets/achievements/publication-deep-learning.jpg",
        link: "https://www.researchgate.net/publication/367079874_Second-order_Derivative_Optimization_Methods_in_Deep_Learning_Neural_Networks",
    },
    {
        id: "languages-fluency",
        title: "Certificate of Fluency",
        subtitle: "Fluent in 4 languages",
        description:
            "Fluent in four languages. Enhanced my cross-cultural communication and adaptability.",
        date: "2026",
        category: "Academic",
        image: "src/assets/achievements/languages-fluency.jpg",
    },
    // Competition
    {
        id: "alluni-anz-6th",
        title: "Sixth Place",
        subtitle: "AllUni: ANZ Competitive Programming Division B",
        description:
            "Recognizes strong problem-solving in competitive programming. Improved my coding speed and teamwork under pressure.",
        date: "2025",
        category: "Competition",
        image: "src/assets/achievements/alluni-anz-6th.jpg",
    },
    {
        id: "iem-quiz-bowl-1st",
        title: "First Place",
        subtitle: "IEM Quiz Bowl",
        description:
            "Awarded for winning a technical quiz competition. Strengthened my teamwork and technical problem-solving.",
        date: "2019",
        category: "Competition",
        image: "src/assets/achievements/iem-quiz-bowl-1st.jpg",
    },
    // Certification
    {
        id: "ccna-intro-networks",
        title: "CCNA: Introduction to Networks",
        subtitle: "Cisco Certified Network Associate (CCNA)",
        description:
            "Completed foundational networking certification. Gained practical knowledge in computer networks.",
        date: "2021",
        category: "Certification",
        image: "src/assets/achievements/ccna-intro-networks.jpg",
    },
    // Leadership
    {
        id: "iemsc-vp",
        title: "Vice President",
        subtitle:
            "Institute of Engineers Malaysia Curtin University Student Section (IEMSC)",
        description:
            "Served as Vice President, organizing events and initiatives. Enhanced my leadership and organizational skills.",
        date: "2022-2023",
        category: "Leadership",
        image: "src/assets/achievements/iemsc-vp.jpg",
    },
    {
        id: "interact-president-treasurer",
        title: "President & Treasurer",
        subtitle: "Interact Club",
        description:
            "Led and managed club activities and finances. Developed my leadership and financial management skills.",
        date: "2015-2016",
        category: "Leadership",
        image: "src/assets/achievements/interact-president-treasurer.jpg",
    },
    {
        id: "gavel-president",
        title: "President of Gavel Club",
        subtitle: "Gavel Club",
        description:
            "Led the Gavel Club to foster communication and leadership. Improved my mentoring and public speaking abilities.",
        date: "2014-2015",
        category: "Leadership",
        image: "src/assets/achievements/gavel-president.jpg",
    },
    // Speaking
    {
        id: "world-speech-day-speaker",
        title: "Speaker & Emcee",
        subtitle: "Toastmaster's World Speech Day",
        description:
            "Recognizes my role as speaker and emcee. Built my confidence and public speaking skills.",
        date: "2016-2017",
        category: "Speaking",
        image: "src/assets/achievements/world-speech-day-speaker.jpg",
    },
];

export const achievementsData = rawAchievementsData.map((achievement) => ({
    ...achievement,
    color:
        categoryColorMap[achievement.category] || "from-gray-400 to-gray-600",
}));
