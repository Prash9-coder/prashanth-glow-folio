import { motion } from "framer-motion";
import { Code, Shield, Video, Coffee, Users, Zap } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const About = () => {
  const stats = [
    { icon: Code, label: "Projects Done", value: "50+" },
    { icon: Coffee, label: "Cups of Coffee", value: "1000+" },
    { icon: Users, label: "Happy Clients", value: "25+" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse opacity-20 blur-xl" />
              <img
                src={profileImg}
                alt="Prashanth"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/50 glow-primary"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-6">
              I'm a passionate <span className="text-primary font-semibold">Full Stack Developer</span> with a deep love for 
              creating secure, scalable applications. My expertise spans across web development, cybersecurity, and video editing.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-6">
              When I'm not coding, you'll find me exploring the latest in <span className="text-secondary font-semibold">cybersecurity</span>, 
              crafting engaging video content, or helping others learn and grow in the tech world.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 glass-card px-4 py-2">
                <Code className="w-5 h-5 text-primary" />
                <span>Development</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2">
                <Shield className="w-5 h-5 text-secondary" />
                <span>Security</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2">
                <Video className="w-5 h-5 text-accent" />
                <span>Video Editing</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 text-center group cursor-pointer"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-secondary transition-colors" />
              <h3 className="text-3xl font-bold mb-2 gradient-text">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;