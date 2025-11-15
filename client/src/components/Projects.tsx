// client/src/components/Projects.tsx
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Code2 } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import type { Project } from "@shared/schema";
import { SectionTitle, Badge } from "./AnimatedCard";
import { useLocation } from "wouter";
import { getTechIcon } from "@/lib/techIcons";

// helper + variants
import { apiGet } from "@/lib/api";
import { containerVariant, cardVariant, hoverVariant } from "@/lib/variants";

const Projects = () => {
  const [, setLocation] = useLocation();

  const { data: allProjects, isLoading, isError } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => apiGet<Project[]>("/api/projects"),
  });

  // homepage shows only featured
  const projects = allProjects?.filter((p) => p.featured) || [];

  return (
    <section id="projects" className="py-20 px-4 relative" data-testid="section-projects">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle title="Featured Projects" subtitle="Showcasing my best work and innovations" />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl animate-pulse-glow" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-red-500 mt-10">Failed to load projects. Please try again later.</p>
        )}

        {!isLoading && !isError && (
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={cardVariant}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                className="group glass-card-hover overflow-hidden rounded-2xl cursor-pointer relative"
                style={{ perspective: "800px" }}
              // apply hover behavior from hoverVariant

              >
                <motion.div
                  variants={hoverVariant}
                  className="relative mb-4 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20"
                >
                  {project.imageUrl ? (
                    <motion.img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.35 }}
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <motion.span
                        className="text-6xl"
                        animate={{ rotate: [0, 6, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        💻
                      </motion.span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Code2 className="w-4 h-4" />
                      <span className="text-sm font-medium">View Project</span>
                    </div>
                  </div>
                </motion.div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:gradient-text transition-all max-w-xs">
                      {project.title}
                    </h3>
                    <div className="text-primary">
                      <Star className="w-5 h-5 fill-primary" />
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.techStack?.map((tech, idx) => {
                      const iconUrl = getTechIcon(tech);
                      return (
                        <div key={idx} className="group relative">
                          {iconUrl ? (
                            <>
                              <img
                                src={iconUrl}
                                alt={tech}
                                className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                title={tech}
                                loading="eager"
                              />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-primary/30 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                {tech}
                              </div>
                            </>
                          ) : (
                            <Badge text={tech} variant="secondary" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <div className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full hover:bg-primary hover:text-primary-foreground border-primary/50 transition-all"
                          asChild
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    )}

                    {project.githubUrl && (
                      <div className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full hover:bg-secondary hover:text-secondary-foreground border-secondary/50 transition-all"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-gradient-to-br from-primary/8 to-secondary/8 blur-sm -z-10" />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity glow-pulse"
            onClick={() => setLocation("/projects")}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
