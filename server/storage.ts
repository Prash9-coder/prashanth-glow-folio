import type {
  InsertProject,
  Project as ProjectType,
  InsertContact,
  Contact as ContactType,
  InsertSponsor,
  Sponsor as SponsorType
} from "@shared/schema";

import { Project, Contact, Sponsor } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<ProjectType[]>;
  createProject(project: InsertProject): Promise<ProjectType>;

  // Contacts
  createContact(contact: InsertContact): Promise<ContactType>;
  getContacts(): Promise<ContactType[]>;

  // Sponsors
  getSponsors(): Promise<SponsorType[]>;
  createSponsor(sponsor: InsertSponsor): Promise<SponsorType>;
}

export class DbStorage implements IStorage {
  // -----------------------------
  // PROJECTS
  // -----------------------------
  async getProjects(): Promise<ProjectType[]> {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return projects.map(project => ({
      _id: project._id.toString(),
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      techStack: project.techStack,
      featured: project.featured,
      createdAt: project.createdAt
    }));
  }

  async createProject(project: InsertProject): Promise<ProjectType> {
    const newProject = new Project(project);
    const saved = await newProject.save();
    return {
      _id: saved._id.toString(),
      title: saved.title,
      description: saved.description,
      imageUrl: saved.imageUrl,
      demoUrl: saved.demoUrl,
      githubUrl: saved.githubUrl,
      techStack: saved.techStack,
      featured: saved.featured,
      createdAt: saved.createdAt
    };
  }

  // -----------------------------
  // CONTACTS
  // -----------------------------
  // GET ALL CONTACTS
  async getContacts(): Promise<ContactType[]> {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return contacts.map(c => ({
      _id: c._id.toString(),
      name: c.name,
      email: c.email,
      message: c.message,
      createdAt: c.createdAt,
    }));
  }

  // CREATE CONTACT
  async createContact(contact: InsertContact): Promise<ContactType> {
    const newContact = new Contact(contact);
    const saved = await newContact.save();

    return {
      _id: saved._id.toString(),
      name: saved.name,
      email: saved.email,
      message: saved.message,
      createdAt: saved.createdAt,
    };
  }


  // -----------------------------
  // SPONSORS
  // -----------------------------
  async getSponsors(): Promise<SponsorType[]> {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 }).lean();
    return sponsors.map(s => ({
      _id: s._id.toString(),
      donorName: s.donorName,
      message: s.message,
      amount: s.amount,
      createdAt: s.createdAt
    }));
  }

  async createSponsor(sponsor: InsertSponsor): Promise<SponsorType> {
    const newSponsor = new Sponsor(sponsor);
    const saved = await newSponsor.save();
    return {
      _id: saved._id.toString(),
      donorName: saved.donorName,
      message: saved.message,
      amount: saved.amount,
      createdAt: saved.createdAt
    };
  }
}

export const storage = new DbStorage();
