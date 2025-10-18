import { motion } from "framer-motion";
import { Code2, Database, Lock, Palette, Server, Smartphone } from "lucide-react";

const Skills = () => {
  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      color: "from-primary to-primary/50",
    },
    {
      icon: Server,
      title: "Backend Development",
      items: ["Node.js", "Express.js", "Python", "REST APIs"],
      color: "from-secondary to-secondary/50",
    },
    {
      icon: Database,
      title: "Database",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      color: "from-accent to-accent/50",
    },
    {
      icon: Lock,
      title: "Cybersecurity",
      items: ["Penetration Testing", "Network Security", "Ethical Hacking", "OWASP"],
      color: "from-primary to-secondary",
    },
    {
      icon: Palette,
      title: "Video Editing",
      items: ["Adobe Premiere", "After Effects", "DaVinci Resolve", "Motion Graphics"],
      color: "from-secondary to-accent",
    },
    {
      icon: Smartphone,
      title: "Tools & Others",
      items: ["Git", "Docker", "AWS", "CI/CD"],
      color: "from-accent to-primary",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

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
              className="glass-card p-6 group cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="mb-4 inline-block">
                  <skill.icon className="w-12 h-12 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-sm px-3 py-1 bg-primary/10 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;