import { motion } from "framer-motion";
import { Code2, Database, Lock, Palette, Server, Smartphone, ArrowRight } from "lucide-react";
import { SectionTitle, Badge } from "./AnimatedCard";

const Skills = () => {
  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      color: "from-primary to-primary/50",
      description: "Building responsive, interactive user interfaces",
    },
    {
      icon: Server,
      title: "Backend Development",
      items: ["Node.js", "Express.js", "Python", "REST APIs"],
      color: "from-secondary to-secondary/50",
      description: "Creating robust server-side applications",
    },
    {
      icon: Database,
      title: "Database",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      color: "from-accent to-accent/50",
      description: "Designing efficient data architectures",
    },
    {
      icon: Lock,
      title: "Cybersecurity",
      items: ["Penetration Testing", "Network Security", "Ethical Hacking", "OWASP"],
      color: "from-primary to-secondary",
      description: "Ensuring application security and compliance",
    },
    {
      icon: Palette,
      title: "Video Editing",
      items: ["Adobe Premiere", "After Effects", "DaVinci Resolve", "Motion Graphics"],
      color: "from-secondary to-accent",
      description: "Creating engaging visual content",
    },
    {
      icon: Smartphone,
      title: "Tools & Others",
      items: ["Git", "Docker", "AWS", "CI/CD"],
      color: "from-accent to-primary",
      description: "Modern development practices and tools",
    },
  ];

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
    hidden: { opacity: 0, y: 20, rotateY: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Master of multiple technologies and practices"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group glass-card-hover p-6 cursor-pointer relative overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="mb-4 inline-block"
                  whileHover={{ rotate: 20, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                    <skill.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">{skill.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors">
                  {skill.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge text={item} variant="primary" />
                    </motion.div>
                  ))}
                </div>

                {/* Hover arrow */}
                <motion.div
                  className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { number: "5+", label: "Years Experience" },
            { number: "50+", label: "Projects Completed" },
            { number: "30+", label: "Technologies" },
            { number: "25+", label: "Happy Clients" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass-card-hover p-6 text-center group"
            >
              <motion.div
                className="text-3xl font-bold gradient-text mb-2 group-hover:text-glow"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;