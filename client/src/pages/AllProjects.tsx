// client/src/pages/AllProjects.tsx
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Code2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@shared/schema";
import { Badge } from "@/components/AnimatedCard";
import { useLocation } from "wouter";
import { getTechIcon } from "@/lib/techIcons";

import { apiGet } from "@/lib/api";
import { containerVariant, cardVariant } from "@/lib/variants";

const AllProjects = () => {
    const [, setLocation] = useLocation();

    const { data: projects, isLoading, isError } = useQuery<Project[]>({
        queryKey: ["all-projects"],
        queryFn: () => apiGet<Project[]>("/api/projects"),
    });

    return (
        <main className="min-h-screen pt-24 pb-20 px-4">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setLocation("/")}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </motion.button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
                    <p className="text-lg text-muted-foreground">Exploring my complete portfolio of {projects?.length || 0} projects</p>
                </motion.div>

                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(12)].map((_, i) => (
                            <Skeleton key={i} className="h-96 rounded-2xl animate-pulse-glow" />
                        ))}
                    </div>
                )}

                {isError && (
                    <p className="text-center text-red-500 mt-10">Failed to load projects. Please try again later.</p>
                )}

                {!isLoading && !isError && (
                    <motion.div variants={containerVariant} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects?.map((project) => (
                            <motion.div key={project._id} variants={cardVariant} whileHover={{ y: -6, scale: 1.03 }} className="group glass-card-hover overflow-hidden rounded-2xl cursor-pointer relative">
                                <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" loading="eager" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-6xl">💻</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                                        <div className="flex items-center gap-2 text-primary">
                                            <Code2 className="w-4 h-4" />
                                            <span className="text-sm font-medium">View Project</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-semibold group-hover:gradient-text transition-all max-w-xs">{project.title}</h3>
                                        <div className="text-primary">
                                            <Star className="w-5 h-5 fill-primary" />
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">{project.description}</p>

                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {project.techStack?.map((tech, idx) => {
                                            const iconUrl = getTechIcon(tech);
                                            return (
                                                <div key={idx} className="group relative">
                                                    {iconUrl ? (
                                                        <img src={iconUrl} alt={tech} className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity" loading="eager" />
                                                    ) : (
                                                        <Badge text={tech} variant="secondary" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="flex gap-3">
                                        {project.demoUrl && (
                                            <Button asChild size="sm" variant="outline" className="w-full">
                                                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button asChild size="sm" variant="outline" className="w-full">
                                                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    Code
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-gradient-to-br from-primary/8 to-secondary/8 blur-sm -z-10" />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!isLoading && projects?.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                        <p className="text-lg text-muted-foreground mb-6">No projects found</p>
                        <Button onClick={() => setLocation("/")} variant="outline">
                            Return to Home
                        </Button>
                    </motion.div>
                )}
            </div>
        </main>
    );
};

export default AllProjects;
