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

  // Sponsors
  getSponsors(): Promise<SponsorType[]>;
  createSponsor(sponsor: InsertSponsor): Promise<SponsorType>;
}

export class DbStorage implements IStorage {
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
    const savedProject = await newProject.save();
    return {
      _id: savedProject._id.toString(),
      title: savedProject.title,
      description: savedProject.description,
      imageUrl: savedProject.imageUrl,
      demoUrl: savedProject.demoUrl,
      githubUrl: savedProject.githubUrl,
      techStack: savedProject.techStack,
      featured: savedProject.featured,
      createdAt: savedProject.createdAt
    };
  }

  async createContact(contact: InsertContact): Promise<ContactType> {
    const newContact = new Contact(contact);
    const savedContact = await newContact.save();
    return {
      _id: savedContact._id.toString(),
      name: savedContact.name,
      email: savedContact.email,
      message: savedContact.message,
      createdAt: savedContact.createdAt
    };
  }

  async getSponsors(): Promise<SponsorType[]> {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 }).lean();
    return sponsors.map(sponsor => ({
      _id: sponsor._id.toString(),
      donorName: sponsor.donorName,
      message: sponsor.message,
      amount: sponsor.amount,
      createdAt: sponsor.createdAt
    }));
  }

  async createSponsor(sponsor: InsertSponsor): Promise<SponsorType> {
    const newSponsor = new Sponsor(sponsor);
    const savedSponsor = await newSponsor.save();
    return {
      _id: savedSponsor._id.toString(),
      donorName: savedSponsor.donorName,
      message: savedSponsor.message,
      amount: savedSponsor.amount,
      createdAt: savedSponsor.createdAt
    };
  }
}

export const storage = new DbStorage();