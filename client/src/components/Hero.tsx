import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Code2, Zap } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Full Stack Developer & Cybersecurity Enthusiast";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const floatingIcons = [
    { Icon: Code2, delay: 0, position: "top-20 left-10" },
    { Icon: Zap, delay: 0.2, position: "top-40 right-20" },
    { Icon: Sparkles, delay: 0.4, position: "bottom-32 left-20" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} text-primary/30`}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay,
            }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass-card"
        >
          <motion.span
            animate={{ rotate: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            👋
          </motion.span>
          <span className="text-sm font-medium">Welcome to my portfolio</span>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl mb-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hi, I'm
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text text-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        >
          Prashanth <motion.span
            animate={{ rotate: [0, 20, 0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="inline-block"
          >
            💻
          </motion.span>
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl font-medium mb-8 h-12 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="gradient-text inline-block min-h-8">{text}</span>
          <motion.span
            className="ml-1 text-primary glow-pulse"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Passionate about building <span className="text-primary font-semibold">secure, scalable applications</span> and helping others through technology
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6 glow-pulse shadow-2xl"
            >
              <span className="flex items-center gap-2">
                Let's Connect
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  →
                </motion.span>
              </span>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary transition-all"
            >
              <a href="/Prashanth_Resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-primary animate-pulse-glow" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;