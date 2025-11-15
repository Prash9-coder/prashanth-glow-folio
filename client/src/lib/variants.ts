import type { Variants } from "framer-motion";

// Safe container animation
export const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

// Safe card animation
export const cardVariant: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut", // ✔️ works in v12
        },
    },
};

// Safe hover animation (without declaring "type")
export const hoverVariant: Variants = {
    hover: {
        y: -8,
        scale: 1.03,
        transition: {
            duration: 0.2,
            ease: "easeOut", // ✔️ no stiffness, no spring
        },
    },
};
