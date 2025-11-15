import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Heart, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Prash9-coder", label: "GitHub", color: "from-primary to-primary/50" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/nimmala-prashanth/", label: "LinkedIn", color: "from-secondary to-secondary/50" },
    // { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "from-accent to-accent/50" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />

      {/* Decorative Circles */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 gradient-text">Prashanth</h3>
            <p className="text-muted-foreground leading-relaxed">
              Full Stack Developer passionate about creating amazing digital experiences and solving complex problems through code.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Skills", "Projects", "Contact"].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 20 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${social.color} glow-pulse hover:shadow-2xl transition-all duration-300 group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8 origin-left"
        />

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 flex-wrap"
          >
            <span>© 2025 Prashanth</span>
            <Heart className="w-4 h-4 text-primary animate-pulse" fill="currentColor" />
            <span>All Rights Reserved</span>
          </motion.p>

          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-muted-foreground group cursor-pointer"
          >
            <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span>Built with passion, powered by technology</span>
          </motion.div>

          {/* Scroll to Top */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center hover:from-primary hover:to-secondary transition-all duration-300 glow-pulse group"
          >
            <ArrowUp className="w-5 h-5 group-hover:text-white transition-colors" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;