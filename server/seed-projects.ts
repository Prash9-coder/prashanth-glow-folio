import mongoose from 'mongoose';
import { Project } from '@shared/schema';
import dotenv from 'dotenv';

dotenv.config();

// Your GitHub projects data
const projectsData = [
    {
        title: "Glow Folio",
        description: "A modern, animated portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, glassmorphism design, and a fully responsive layout.",
        imageUrl: "https://via.placeholder.com/600x400?text=Glow+Folio",
        demoUrl: "https://prashanth-glow-folio.vercel.app",
        githubUrl: "https://github.com/Prash9-coder/prashanth-glow-folio",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Express.js", "MongoDB"]
    },
    {
        title: "AI-powered Threat Detection SaaS",
        description: "An enterprise-grade SaaS platform for AI-powered cybersecurity threat detection and analysis. Features real-time monitoring, threat intelligence, and analytics dashboard.",
        imageUrl: "https://via.placeholder.com/600x400?text=Threat+Detection",
        githubUrl: "https://github.com/Prash9-coder/AI-powered-Threat-Detection-SaaS--MVP-",
        techStack: ["TypeScript", "React", "Node.js", "Machine Learning", "AWS", "MongoDB"],
        featured: true
    },
    {
        title: "AI English Trainer",
        description: "An interactive AI-powered platform for English language learning. Features real-time conversation practice, grammar checking, and personalized learning paths.",
        imageUrl: "https://via.placeholder.com/600x400?text=English+Trainer",
        githubUrl: "https://github.com/Prash9-coder/AI_English_Trainer",
        techStack: ["TypeScript", "React", "AI/ML", "Node.js", "PostgreSQL"]
    },
    {
        title: "K-Mart E-Commerce",
        description: "A full-featured e-commerce platform with product catalog, shopping cart, secure payment integration, and admin dashboard for inventory management.",
        imageUrl: "https://via.placeholder.com/600x400?text=K-Mart",
        githubUrl: "https://github.com/Prash9-coder/K-Mart",
        techStack: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Stripe"],
        featured: true
    },
    {
        title: "Auravel Webflow Clone",
        description: "A pixel-perfect clone of the Auravel Webflow template. Built as a demonstration of advanced web design and component recreation skills.",
        imageUrl: "https://via.placeholder.com/600x400?text=Auravel+Clone",
        githubUrl: "https://github.com/Prash9-coder/auravel-clone",
        techStack: ["TypeScript", "React", "Tailwind CSS", "Responsive Design"]
    },
    {
        title: "English-Telugu AI",
        description: "An AI-powered language translation and learning platform bridging English and Telugu. Features real-time translation, pronunciation guides, and cultural context.",
        imageUrl: "https://via.placeholder.com/600x400?text=Eng-Telugu+AI",
        githubUrl: "https://github.com/Prash9-coder/eng-telugu-ai",
        techStack: ["TypeScript", "AI/ML", "React", "Node.js", "Natural Language Processing"]
    },
    {
        title: "Code Agent",
        description: "An AI-powered code generation and debugging assistant. Helps generate code snippets, fix bugs, and provide coding suggestions in real-time.",
        imageUrl: "https://via.placeholder.com/600x400?text=Code+Agent",
        githubUrl: "https://github.com/Prash9-coder/prash-codeAgent12",
        techStack: ["JavaScript", "AI/ML", "Node.js", "React", "Claude API"]
    },
    {
        title: "AI Technical Teacher",
        description: "An intelligent tutoring system that teaches programming and computer science concepts. Features interactive lessons, code execution, and personalized learning paths.",
        imageUrl: "https://via.placeholder.com/600x400?text=Tech+Teacher",
        githubUrl: "https://github.com/Prash9-coder/AI_Technical_Teacher",
        techStack: ["JavaScript", "React", "Node.js", "AI/ML", "MongoDB"]
    },
    {
        title: "AI Assessment Test Platform",
        description: "A comprehensive platform for creating, administering, and analyzing AI-powered assessment tests. Features automatic grading, analytics, and performance tracking.",
        imageUrl: "https://via.placeholder.com/600x400?text=Assessment+Test",
        githubUrl: "https://github.com/Prash9-coder/AI-Assessment-Test",
        techStack: ["JavaScript", "React", "Node.js", "MongoDB", "Chart.js"]
    },
    {
        title: "News Aggregator",
        description: "A mobile app that aggregates news from multiple sources and provides personalized content recommendations based on user preferences.",
        imageUrl: "https://via.placeholder.com/600x400?text=News+Aggregator",
        githubUrl: "https://github.com/Prash9-coder/news_aggretor",
        techStack: ["Dart", "Flutter", "REST API", "Firebase"]
    },
    {
        title: "JARVIS Desktop Assistant",
        description: "A Python-based desktop voice assistant similar to JARVIS from Iron Man. Features voice commands, task automation, and system control.",
        imageUrl: "https://via.placeholder.com/600x400?text=JARVIS",
        githubUrl: "https://github.com/Prash9-coder/JARVIS-DESKTOP-ASSISTANT",
        techStack: ["Python", "Voice Recognition", "Natural Language Processing", "Automation"],
        featured: true
    },
    {
        title: "Smile Detector",
        description: "A computer vision project that detects and analyzes facial expressions, specifically identifying smiles in images and video streams.",
        imageUrl: "https://via.placeholder.com/600x400?text=Smile+Detector",
        githubUrl: "https://github.com/Prash9-coder/smiledetecter",
        techStack: ["Python", "OpenCV", "Computer Vision", "TensorFlow"]
    },
    {
        title: "E-Commerce Backend (Flask)",
        description: "A robust backend API for e-commerce platforms built with Flask. Features product management, user authentication, and order processing.",
        imageUrl: "https://via.placeholder.com/600x400?text=Flask+Backend",
        githubUrl: "https://github.com/Prash9-coder/E-Commerce-flask-backend",
        techStack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "JWT"],
        featured: true
    },
    {
        title: "E-Commerce Frontend",
        description: "A responsive frontend for e-commerce platforms built with vanilla HTML, CSS, and JavaScript. Features product browsing, cart management, and checkout.",
        imageUrl: "https://via.placeholder.com/600x400?text=Commerce+Frontend",
        githubUrl: "https://github.com/Prash9-coder/E-commerce-frontend",
        techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
        title: "E-Cell Initiative",
        description: "A web application for an entrepreneurship cell organization. Features event management, member profiles, and initiative showcase.",
        imageUrl: "https://via.placeholder.com/600x400?text=E-Cell",
        demoUrl: "https://e-cell-sunstone.vercel.app/",
        githubUrl: "https://github.com/Prash9-coder/E-Cell",
        techStack: ["JavaScript", "React", "Node.js", "MongoDB"],
        featured: true
    },
    {
        title: "Srivari Seva Ticketing Bot",
        description: "An intelligent bot system for managing ticket bookings for cultural events. Features automated booking, confirmation, and queue management.",
        imageUrl: "https://via.placeholder.com/600x400?text=Ticketing+Bot",
        githubUrl: "https://github.com/Prash9-coder/srivari_seva_ticket-booking_bot",
        techStack: ["Python", "Bot Framework", "Database", "REST API"]
    },
    {
        title: "State Automation",
        description: "A Python project for state machine implementation and automation. Useful for workflow automation, process management, and system orchestration.",
        imageUrl: "https://via.placeholder.com/600x400?text=State+Automation",
        githubUrl: "https://github.com/Prash9-coder/stateautomation",
        techStack: ["Python", "State Machines", "Automation"]
    },
    {
        title: "Swift Statement",
        description: "A fast and efficient statement parser and processor. Handles complex parsing requirements with optimized performance.",
        imageUrl: "https://via.placeholder.com/600x400?text=Swift+Statement",
        githubUrl: "https://github.com/Prash9-coder/SwiftStatement",
        techStack: ["TypeScript", "Parser", "Performance Optimization"]
    },
    {
        title: "JavaScript Milestones",
        description: "A series of JavaScript projects demonstrating progressive learning milestones, from basics to advanced concepts.",
        imageUrl: "https://via.placeholder.com/600x400?text=JS+Milestones",
        githubUrl: "https://github.com/Prash9-coder/js-milestone-2",
        techStack: ["JavaScript", "HTML", "CSS", "DOM Manipulation"]
    },
    {
        title: "Web Milestones",
        description: "Progressive web development projects covering HTML, CSS, JavaScript, and web design best practices.",
        imageUrl: "https://via.placeholder.com/600x400?text=Web+Milestones",
        githubUrl: "https://github.com/Prash9-coder/web-milestone-2",
        techStack: ["JavaScript", "HTML", "CSS", "Web Development"]
    }
];

async function seedProjects() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not set");
        }

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");

        // Clear existing projects
        await Project.deleteMany({});
        console.log("Cleared existing projects");

        // Insert new projects
        const savedProjects = await Project.insertMany(projectsData);
        console.log(`✅ Successfully seeded ${savedProjects.length} projects`);

        // Display summary
        console.log("\n📊 Projects Summary:");
        console.log(`Total Projects: ${savedProjects.length}`);
        console.log("\nProjects added:");
        savedProjects.forEach((project, index) => {
            console.log(`${index + 1}. ${project.title}`);
        });

        await mongoose.disconnect();
        console.log("\n✅ Database seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding projects:", error);
        process.exit(1);
    }
}

seedProjects();