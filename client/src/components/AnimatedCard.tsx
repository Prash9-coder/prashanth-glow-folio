import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps extends MotionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    index?: number;
}

export const AnimatedCard = ({
    children,
    className = "",
    delay = 0,
    index = 0,
    ...motionProps
}: AnimatedCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: (index || 0) * 0.1 + delay,
            }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`glass-card-hover transition-all duration-300 ${className}`}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
};

interface StatBoxProps {
    value: string;
    label: string;
    icon?: ReactNode;
    delay?: number;
    index?: number;
}

export const StatBox = ({ value, label, icon, delay = 0, index = 0 }: StatBoxProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
            duration: 0.5,
            delay: (index || 0) * 0.1 + delay,
        }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-card-hover p-6 text-center group cursor-pointer"
    >
        {icon && (
            <motion.div
                className="mb-4 inline-block"
                whileHover={{ rotate: 20, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
                {icon}
            </motion.div>
        )}
        <h3 className="text-3xl font-bold mb-2 gradient-text">{value}</h3>
        <p className="text-muted-foreground">{label}</p>
    </motion.div>
);

interface BadgeProps {
    text: string;
    variant?: "primary" | "secondary" | "accent";
    animated?: boolean;
}

export const Badge = ({ text, variant = "primary", animated = false }: BadgeProps) => {
    const variantStyles = {
        primary: "bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary",
        secondary: "bg-secondary/10 border-secondary/20 hover:bg-secondary/20 text-secondary",
        accent: "bg-accent/10 border-accent/20 hover:bg-accent/20 text-accent",
    };

    return (
        <motion.span
            whileHover={{ scale: 1.05 }}
            className={`text-sm px-3 py-1 rounded-full border transition-colors cursor-default ${variantStyles[variant]} ${animated ? "animate-pulse-glow" : ""
                }`}
        >
            {text}
        </motion.span>
    );
};

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    delay?: number;
}

export const SectionTitle = ({ title, subtitle, delay = 0 }: SectionTitleProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="text-center mb-16"
    >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-glow">{title}</h2>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
        />
        {subtitle && (
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: delay + 0.3 }}
                className="text-lg text-muted-foreground mt-4"
            >
                {subtitle}
            </motion.p>
        )}
    </motion.div>
);

interface SkillBarProps {
    skill: string;
    percentage: number;
    delay?: number;
    color?: "primary" | "secondary" | "accent";
}

export const SkillBar = ({ skill, percentage, delay = 0, color = "primary" }: SkillBarProps) => {
    const colorClass =
        color === "primary"
            ? "from-primary to-primary/50"
            : color === "secondary"
                ? "from-secondary to-secondary/50"
                : "from-accent to-accent/50";

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="mb-6"
        >
            <div className="flex justify-between mb-2">
                <span className="font-medium">{skill}</span>
                <span className="text-primary font-semibold">{percentage}%</span>
            </div>
            <div className="w-full h-2 bg-card rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay + 0.2 }}
                    className={`h-full rounded-full bg-gradient-to-r ${colorClass} glow-primary`}
                />
            </div>
        </motion.div>
    );
};