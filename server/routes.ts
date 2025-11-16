import type { Express } from "express";
import { storage } from "./storage.js";
import {
  insertProjectSchema,
  insertContactSchema,
  insertSponsorSchema,
  Project,
} from "../shared/schema.js"; // ✅ Fixed
import nodemailer from "nodemailer";

export function registerRoutes(app: Express) {
  // Debug endpoint
  app.get("/api/debug", (req, res) => {
    res.json({
      mongodbUri: process.env.MONGODB_URI ? "Set" : "Not set",
      nodeEnv: process.env.NODE_ENV,
      smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
      timestamp: new Date().toISOString(),
    });
  });

  // SEED Projects
  app.post("/api/seed", async (req, res) => {
    try {
      const projectsData = [
        {
          title: "Glow Folio",
          description: "A modern portfolio built with React, TypeScript & Tailwind.",
          imageUrl: "https://via.placeholder.com/600x400?text=Glow+Folio",
          demoUrl: "https://prashanth-glow-folio.vercel.app",
          githubUrl: "https://github.com/Prash9-coder/prashanth-glow-folio",
          techStack: ["React", "TypeScript", "Tailwind", "Framer Motion", "Express", "MongoDB"],
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
    } catch (e: any) {
      console.error("Seed error:", e);
      res.status(500).json({ error: e.message || "Failed to seed projects" });
    }
  });

  // GET ALL PROJECTS
  app.get("/api/projects", async (req, res) => {
    try {
      const items = await storage.getProjects();
      res.json(items);
    } catch (e: any) {
      console.error("Get projects error:", e);
      res.status(500).json({ error: e.message || "Failed to fetch projects" });
    }
  });

  // CREATE PROJECT
  app.post("/api/projects", async (req, res) => {
    try {
      const validated = insertProjectSchema.parse(req.body);
      const item = await storage.createProject(validated);
      res.status(201).json(item);
    } catch (e: any) {
      console.error("Create project error:", e);
      res.status(400).json({ error: e.message || "Invalid project data" });
    }
  });

  // GET CONTACTS
  app.get("/api/contacts", async (req, res) => {
    try {
      const items = await storage.getContacts();
      res.json(items);
    } catch (e: any) {
      console.error("Get contacts error:", e);
      res.status(500).json({ error: e.message || "Failed to fetch contacts" });
    }
  });

  // CREATE CONTACT
  app.post("/api/contacts", async (req, res) => {
    console.log("📧 Incoming Contact Request:", req.body);

    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);

      // Email notification
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          const mailOptions = {
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
            subject: `New Contact from ${contact.name}`,
            html: `
              <h2>New Contact Request</h2>
              <p><strong>Name:</strong> ${contact.name}</p>
              <p><strong>Email:</strong> ${contact.email}</p>
              <p><strong>Message:</strong> ${contact.message}</p>
              <hr>
              <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
            `,
          };

          await transporter.sendMail(mailOptions);
          console.log("✅ Email notification sent");
        } catch (emailError) {
          console.error("⚠️ Email send failed:", emailError);
          // Don't fail the request if email fails
        }
      }

      return res.status(201).json({ success: true, contact });
    } catch (error: any) {
      console.error("❌ Contact creation error:", error);
      res.status(400).json({ error: error.message || "Invalid contact data" });
    }
  });

  // GET SPONSORS
  app.get("/api/sponsors", async (req, res) => {
    try {
      const items = await storage.getSponsors();
      res.json(items);
    } catch (e: any) {
      console.error("Get sponsors error:", e);
      res.status(500).json({ error: e.message || "Failed to fetch sponsors" });
    }
  });

  // CREATE SPONSOR
  app.post("/api/sponsors", async (req, res) => {
    try {
      const validated = insertSponsorSchema.parse(req.body);
      const item = await storage.createSponsor(validated);
      res.status(201).json(item);
    } catch (e: any) {
      console.error("Create sponsor error:", e);
      res.status(400).json({ error: e.message || "Invalid sponsor data" });
    }
  });
}