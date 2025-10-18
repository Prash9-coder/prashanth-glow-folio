import type { InsertProject, Project, InsertContact, Contact, InsertSponsor, Sponsor } from "@shared/schema";
import { db } from "./db";
import { projects, contacts, sponsors } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Sponsors
  getSponsors(): Promise<Sponsor[]>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
}

export class DbStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getSponsors(): Promise<Sponsor[]> {
    return await db.select().from(sponsors).orderBy(desc(sponsors.createdAt));
  }

  async createSponsor(sponsor: InsertSponsor): Promise<Sponsor> {
    const [newSponsor] = await db.insert(sponsors).values(sponsor).returning();
    return newSponsor;
  }
}

export const storage = new DbStorage();
