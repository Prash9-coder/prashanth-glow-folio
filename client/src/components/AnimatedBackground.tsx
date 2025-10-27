import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle system
        const particles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                id: i,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
            });
        }
        particlesRef.current = particles;

        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "rgba(30, 20, 60, 0.5)");
            gradient.addColorStop(0.5, "rgba(20, 40, 60, 0.3)");
            gradient.addColorStop(1, "rgba(30, 20, 60, 0.5)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw particles
            particles.forEach((particle, index) => {
                const t = (time - particle.delay) % particle.duration;
                const progress = t / particle.duration;

                const x = particle.x + Math.sin(time * 0.5 + index) * 30;
                const y = particle.y + Math.cos(time * 0.3 + index) * 30 - progress * 100;

                // Only draw if in view
                if (y < canvas.height) {
                    ctx.fillStyle = `rgba(147, 51, 234, ${0.6 * (1 - progress)})`;
                    ctx.beginPath();
                    ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #0f0a1a 0%, #1a0a3a 50%, #0f0a1a 100%)" }}
            />

            {/* Animated Blobs */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Blob 1 - Primary */}
                <motion.div
                    className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, 30, -30, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Blob 2 - Secondary */}
                <motion.div
                    className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -50, 50, 0],
                        y: [0, -30, 30, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Blob 3 - Accent */}
                <motion.div
                    className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full blur-3xl"
                    animate={{
                        x: [0, 30, -30, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.05, 0.95, 1],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full ${i === 0
                                ? "bg-primary/60"
                                : i === 1
                                    ? "bg-secondary/60"
                                    : "bg-accent/60"
                            }`}
                        animate={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        transition={{
                            duration: 15 + i * 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            filter: "drop-shadow(0 0 20px currentColor)",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AnimatedBackground;