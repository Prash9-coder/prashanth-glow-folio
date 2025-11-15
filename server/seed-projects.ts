import mongoose from 'mongoose';
import { Project } from '@shared/schema';
import dotenv from 'dotenv';

dotenv.config();

// Your GitHub projects data
const projectsData = [
    {
        title: "Glow Folio",
        description: "A modern, animated portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, glassmorphism design, and a fully responsive layout.",
        imageUrl: "https://placehold.co/600x400?text=Glow+Folio",
        demoUrl: "https://prashanth-glow-folio.vercel.app",
        githubUrl: "https://github.com/Prash9-coder/prashanth-glow-folio",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Express.js", "MongoDB"]
    },
    {
        title: "AI-powered Threat Detection SaaS",
        description: "An enterprise-grade SaaS platform for AI-powered cybersecurity threat detection and analysis.",
        imageUrl: "https://placehold.co/600x400?text=Threat+Detection",
        githubUrl: "https://github.com/Prash9-coder/AI-powered-Threat-Detection-SaaS--MVP-",
        techStack: ["TypeScript", "React", "Node.js", "Machine Learning", "AWS", "MongoDB"],
        featured: true
    },
    {
        title: "AI English Trainer",
        description: "An AI-powered platform for English learning with conversation practice and grammar assistance.",
        imageUrl: "https://placehold.co/600x400?text=English+Trainer",
        githubUrl: "https://github.com/Prash9-coder/AI_English_Trainer",
        techStack: ["TypeScript", "React", "AI/ML", "Node.js", "PostgreSQL"]
    },
    {
        title: "K-Mart E-Commerce",
        description: "A full e-commerce platform with products, cart, payment, and admin dashboard.",
        imageUrl: "https://placehold.co/600x400?text=K-Mart",
        githubUrl: "https://github.com/Prash9-coder/K-Mart",
        techStack: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Stripe"],
        featured: true
    },
    {
        title: "Auravel Webflow Clone",
        description: "A perfect clone of the Auravel Webflow template using React and Tailwind.",
        imageUrl: "https://placehold.co/600x400?text=Auravel+Clone",
        githubUrl: "https://github.com/Prash9-coder/auravel-clone",
        techStack: ["TypeScript", "React", "Tailwind CSS", "Responsive Design"]
    },
    {
        title: "English-Telugu AI",
        description: "AI-powered English ↔ Telugu translator with pronunciation and ML models.",
        imageUrl: "https://placehold.co/600x400?text=Eng-Telugu+AI",
        githubUrl: "https://github.com/Prash9-coder/eng-telugu-ai",
        techStack: ["TypeScript", "AI/ML", "React", "Node.js", "NLP"]
    },
    {
        title: "Code Agent",
        description: "AI-based code generation and debugging assistant.",
        imageUrl: "https://placehold.co/600x400?text=Code+Agent",
        githubUrl: "https://github.com/Prash9-coder/prash-codeAgent12",
        techStack: ["JavaScript", "AI/ML", "Node.js", "React", "Claude API"]
    },
    {
        title: "AI Technical Teacher",
        description: "AI tutor for programming and CS concepts with interactive learning.",
        imageUrl: "https://placehold.co/600x400?text=Tech+Teacher",
        githubUrl: "https://github.com/Prash9-coder/AI_Technical_Teacher",
        techStack: ["JavaScript", "React", "Node.js", "AI/ML", "MongoDB"]
    },
    {
        title: "AI Assessment Test Platform",
        description: "AI-based assessment platform with auto-grading and analytics.",
        imageUrl: "https://placehold.co/600x400?text=Assessment+Test",
        githubUrl: "https://github.com/Prash9-coder/AI-Assessment-Test",
        techStack: ["JavaScript", "React", "Node.js", "MongoDB", "Chart.js"]
    },
    {
        title: "News Aggregator",
        description: "Mobile app that aggregates news from multiple APIs.",
        imageUrl: "https://placehold.co/600x400?text=News+Aggregator",
        githubUrl: "https://github.com/Prash9-coder/news_aggretor",
        techStack: ["Dart", "Flutter", "REST API", "Firebase"]
    },
    {
        title: "JARVIS Desktop Assistant",
        description: "Voice-controlled desktop assistant with automation.",
        imageUrl: "https://placehold.co/600x400?text=JARVIS",
        githubUrl: "https://github.com/Prash9-coder/JARVIS-DESKTOP-ASSISTANT",
        techStack: ["Python", "Voice Recognition", "NLP", "Automation"],
        featured: true
    },
    {
        title: "Smile Detector",
        description: "Computer vision model detecting facial smiles.",
        imageUrl: "https://placehold.co/600x400?text=Smile+Detector",
        githubUrl: "https://github.com/Prash9-coder/smiledetecter",
        techStack: ["Python", "OpenCV", "Computer Vision", "TensorFlow"]
    },
    {
        title: "E-Commerce Backend (Flask)",
        description: "Flask-based backend with authentication and order management.",
        imageUrl: "https://placehold.co/600x400?text=Flask+Backend",
        githubUrl: "https://github.com/Prash9-coder/E-Commerce-flask-backend",
        techStack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "JWT"],
        featured: true
    },
    {
        title: "E-Commerce Frontend",
        description: "Frontend for e-commerce with product and cart UI.",
        imageUrl: "https://placehold.co/600x400?text=Commerce+Frontend",
        githubUrl: "https://github.com/Prash9-coder/E-commerce-frontend",
        techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    {
        title: "E-Cell Initiative",
        description: "Web application for entrepreneurship cell events and members.",
        imageUrl: "https://placehold.co/600x400?text=E-Cell",
        demoUrl: "https://e-cell-sunstone.vercel.app/",
        githubUrl: "https://github.com/Prash9-coder/E-Cell",
        techStack: ["JavaScript", "React", "Node.js", "MongoDB"],
        featured: true
    },
    {
        title: "Srivari Seva Ticketing Bot",
        description: "Automated bot for ticket booking.",
        imageUrl: "https://placehold.co/600x400?text=Ticketing+Bot",
        githubUrl: "https://github.com/Prash9-coder/srivari_seva_ticket-booking_bot",
        techStack: ["Python", "Bot Framework", "Database", "REST API"]
    },
    {
        title: "State Automation",
        description: "State machine implementation for automation tasks.",
        imageUrl: "https://placehold.co/600x400?text=State+Automation",
        githubUrl: "https://github.com/Prash9-coder/stateautomation",
        techStack: ["Python", "State Machines", "Automation"]
    },
    {
        title: "Swift Statement",
        description: "High-performance statement parser.",
        imageUrl: "https://placehold.co/600x400?text=Swift+Statement",
        githubUrl: "https://github.com/Prash9-coder/SwiftStatement",
        techStack: ["TypeScript", "Parser", "Performance Optimization"]
    },
    {
        title: "JavaScript Milestones",
        description: "Series of beginner-to-advanced JavaScript milestone projects.",
        imageUrl: "https://placehold.co/600x400?text=JS+Milestones",
        githubUrl: "https://github.com/Prash9-coder/js-milestone-2",
        techStack: ["JavaScript", "HTML", "CSS", "DOM"]
    },
    {
        title: "Web Milestones",
        description: "Web development milestone projects.",
        imageUrl: "https://placehold.co/600x400?text=Web+Milestones",
        githubUrl: "https://github.com/Prash9-coder/web-milestone-2",
        techStack: ["JavaScript", "HTML", "CSS", "Web Development"]
    },
    {
        title: "AI Post Generator",
        description: "AI tool generating social media posts automatically.",
        imageUrl: "https://placehold.co/600x400?text=AI+Post+Generator",
        demoUrl: "https://ai-post-generator-sage.vercel.app",
        githubUrl: "https://github.com/Prash9-coder/ai-post-generator",
        techStack: ["JavaScript", "AI/ML", "React", "API Integration"],
        featured: true
    },
    {
        title: "AndroRAT",
        description: "Android Remote Access Tool for research.",
        imageUrl: "https://placehold.co/600x400?text=AndroRAT",
        githubUrl: "https://github.com/Prash9-coder/AndroRAT",
        techStack: ["Java", "Android", "Security"]
    },
    {
        title: "Crypton Watch",
        description: "Crypto tracking app with real-time data.",
        imageUrl: "https://placehold.co/600x400?text=Crypton+Watch",
        githubUrl: "https://github.com/Prash9-coder/crypton-watch",
        techStack: ["TypeScript", "React", "API Integration", "Finance"],
        featured: true
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

        await Project.deleteMany({});
        console.log("Cleared existing projects");

        const savedProjects = await Project.insertMany(projectsData);
        console.log(`✅ Successfully seeded ${savedProjects.length} projects`);

        savedProjects.forEach((project, index) =>
            console.log(`${index + 1}. ${project.title}`)
        );

        await mongoose.disconnect();
        console.log("Seed completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding projects:", error);
        process.exit(1);
    }
}

seedProjects();
