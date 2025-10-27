import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Code2 } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import type { Project } from "@shared/schema";
import { SectionTitle, Badge } from "./AnimatedCard";
import { useLocation } from "wouter";
import { getTechIcon } from "@/lib/techIcons";

const Projects = () => {
  const [, setLocation] = useLocation();
  const { data: allProjects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Filter only featured projects for homepage
  const projects = allProjects?.filter(p => p.featured) || [];

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
    hidden: { opacity: 0, rotateY: -90, y: 30 },
    visible: {
      opacity: 1,
      rotateY: 0,
      y: 0,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 relative" data-testid="section-projects">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          title="Featured Projects"
          subtitle="Showcasing my best work and innovations"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl animate-pulse-glow" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects?.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -15 }}
                className="group glass-card-hover overflow-hidden rounded-2xl cursor-pointer relative"
                data-testid={`card-project-${project._id}`}
                style={{ perspective: "1000px" }}
              >
                {/* Image Container with Overlay */}
                <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  {project.imageUrl ? (
                    <motion.img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      data-testid={`img-project-${project._id}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.span
                        className="text-6xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        💻
                      </motion.span>
                    </div>
                  )}

                  {/* Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  >
                    <div className="flex items-center gap-2 text-primary">
                      <Code2 className="w-4 h-4" />
                      <span className="text-sm font-medium">View Project</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-xl font-semibold group-hover:gradient-text transition-all max-w-xs"
                      data-testid={`text-project-title-${project._id}`}
                    >
                      {project.title}
                    </h3>
                    <motion.div
                      whileHover={{ rotate: 20 }}
                      className="text-primary"
                    >
                      <Star className="w-5 h-5 fill-primary" />
                    </motion.div>
                  </div>

                  <p
                    className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed"
                    data-testid={`text-project-description-${project._id}`}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack with Icons */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.techStack?.map((tech, idx) => {
                      const iconUrl = getTechIcon(tech);
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.15, y: -4 }}
                          className="group relative"
                          data-testid={`badge-tech-${idx}`}
                        >
                          {iconUrl ? (
                            <>
                              <img
                                src={iconUrl}
                                alt={tech}
                                className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                title={tech}
                              />
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-primary/30 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                {tech}
                              </div>
                            </>
                          ) : (
                            <Badge text={tech} variant="secondary" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full hover:bg-primary hover:text-primary-foreground border-primary/50 transition-all"
                          asChild
                          data-testid={`button-demo-${project._id}`}
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    {project.githubUrl && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full hover:bg-secondary hover:text-secondary-foreground border-secondary/50 transition-all"
                          asChild
                          data-testid={`button-github-${project._id}`}
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl -z-10" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity glow-pulse"
            onClick={() => setLocation("/projects")}
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
