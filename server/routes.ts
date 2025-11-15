import type { Express } from "express";
import { storage } from "./storage";
import {
  insertProjectSchema,
  insertContactSchema,
  insertSponsorSchema,
  Project,
} from "@shared/schema";

export function registerRoutes(app: Express) {
  // Debug
  app.get("/api/debug", (req, res) => {
    res.json({
      mongodbUri: process.env.MONGODB_URI ? "Set" : "Not set",
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  // SEED Projects
  app.post("/api/seed", async (req, res) => {
    try {
      const projectsData = [
        {
          title: "Glow Folio",
          description:
            "A modern portfolio built with React, TypeScript & Tailwind.",
          imageUrl: "https://via.placeholder.com/600x400?text=Glow+Folio",
          demoUrl: "https://prashanth-glow-folio.vercel.app",
          githubUrl: "https://github.com/Prash9-coder/prashanth-glow-folio",
          techStack: [
            "React",
            "TypeScript",
            "Tailwind",
            "Framer Motion",
            "Express",
            "MongoDB",
          ],
          featured: true,
        },
        {
          title: "AI English Trainer",
          description: "An AI-powered English learning assistant.",
          imageUrl: "https://via.placeholder.com/600x400?text=AI+Trainer",
          githubUrl: "https://github.com/Prash9-coder/AI_English_Trainer",
          techStack: ["React", "TypeScript", "AI/ML"],
        },
      ];

      await Project.deleteMany({});
      const saved = await Project.insertMany(projectsData);

      res.json({
        success: true,
        count: saved.length,
        message: "Seeded projects successfully",
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to seed projects" });
    }
  });

  // GET ALL PROJECTS
  app.get("/api/projects", async (req, res) => {
    try {
      const items = await storage.getProjects();
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // CREATE PROJECT
  app.post("/api/projects", async (req, res) => {
    try {
      const validated = insertProjectSchema.parse(req.body);
      const item = await storage.createProject(validated);
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // GET CONTACTS
  app.get("/api/contacts", async (req, res) => {
    try {
      const items = await storage.getContacts();
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // CREATE CONTACT
  app.post("/api/contacts", async (req, res) => {
    try {
      const validated = insertContactSchema.parse(req.body);
      const item = await storage.createContact(validated);
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // GET SPONSORS
  app.get("/api/sponsors", async (req, res) => {
    try {
      const items = await storage.getSponsors();
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch sponsors" });
    }
  });

  // CREATE SPONSOR
  app.post("/api/sponsors", async (req, res) => {
    try {
      const validated = insertSponsorSchema.parse(req.body);
      const item = await storage.createSponsor(validated);
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ error: "Invalid sponsor data" });
    }
  });
}
