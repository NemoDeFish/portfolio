import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInWhenVisibleProps {
    children: React.ReactNode;
    delay?: number;
}

const bounceEase = [0.34, 1.56, 0.64, 1] as any;

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
    children,
    delay = 0,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{
                duration: 0.7,
                ease: bounceEase,
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInWhenVisible;

// Instead of giving me one new whole document, write a tutorial similar to the ones before on the changes that I need to make from my current website to the new website. Currently, I'm already using framer-motion, so use it. Also use animation components where possible to reduce repeated code. Erik's hero section has a big rectangle that has a typing effect and will switch between Mobile, Software, and Web Developer. Also. In his hero section, there are icons to his socials. Remember to animate these icons as well. Also, he has a special mouse pointer instead of the default, how do I do that
