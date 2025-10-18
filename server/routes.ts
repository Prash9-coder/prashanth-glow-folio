import type { Express } from "express";
import { storage } from "./storage";
import { insertProjectSchema, insertContactSchema, insertSponsorSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // Contacts routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Sponsors routes
  app.get("/api/sponsors", async (req, res) => {
    try {
      const sponsors = await storage.getSponsors();
      res.json(sponsors);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      res.status(500).json({ error: "Failed to fetch sponsors" });
    }
  });

  app.post("/api/sponsors", async (req, res) => {
    try {
      const validatedData = insertSponsorSchema.parse(req.body);
      const sponsor = await storage.createSponsor(validatedData);
      res.status(201).json(sponsor);
    } catch (error) {
      console.error("Error creating sponsor:", error);
      res.status(400).json({ error: "Invalid sponsor data" });
    }
  });
}
