import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrollY(currentScroll);
            setIsScrolled(currentScroll > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                        ? "glass-card py-3 px-4 shadow-2xl"
                        : "py-6 px-4 bg-transparent"
                    }`}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-2xl font-bold cursor-pointer"
                    >
                        <span className="gradient-text text-glow">Prashanth</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.href);
                                }}
                                whileHover={{ y: -2 }}
                                className="text-foreground/80 hover:text-primary transition-colors relative group cursor-pointer underline-glow"
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity glow-pulse"
                            onClick={() => handleNavClick("#contact")}
                        >
                            Let's Talk
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : -20,
                    pointerEvents: isOpen ? "auto" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-16 left-0 right-0 z-40 md:hidden glass-card m-4 rounded-2xl overflow-hidden"
            >
                <div className="flex flex-col p-4 space-y-3">
                    {navItems.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                            {item.name}
                        </motion.a>
                    ))}
                    <Button
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity mt-2"
                        onClick={() => handleNavClick("#contact")}
                    >
                        Let's Talk
                    </Button>
                </div>
            </motion.div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
                style={{
                    scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight),
                    transformOrigin: "left",
                }}
            />
        </>
    );
};

export default Navbar;