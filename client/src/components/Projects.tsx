import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import type { Project } from "@shared/schema";

const Projects = () => {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

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
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-20 px-4" data-testid="section-projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
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
            {projects?.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-card p-6 group cursor-pointer"
                data-testid={`card-project-${project.id}`}
              >
                <div className="mb-4 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                      data-testid={`img-project-${project.id}`}
                    />
                  ) : (
                    <span className="text-6xl">💻</span>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-project-description-${project.id}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full border border-secondary/20"
                      data-testid={`badge-tech-${idx}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.demoUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:bg-primary hover:text-primary-foreground"
                      asChild
                      data-testid={`button-demo-${project.id}`}
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:bg-secondary hover:text-secondary-foreground"
                      asChild
                      data-testid={`button-github-${project.id}`}
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
