import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// MongoDB Document interfaces
export interface IProject extends Document {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured?: boolean;
  createdAt: Date;
}

export interface IContact extends Document {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface ISponsor extends Document {
  _id: string;
  donorName: string;
  message?: string;
  amount?: number;
  createdAt: Date;
}

// Mongoose Schemas
const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  demoUrl: { type: String },
  githubUrl: { type: String },
  techStack: { type: [String], required: true, default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const sponsorSchema = new Schema<ISponsor>({
  donorName: { type: String, required: true },
  message: { type: String },
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

// Mongoose Models
export const Project = mongoose.model<IProject>('Project', projectSchema);
export const Contact = mongoose.model<IContact>('Contact', contactSchema);
export const Sponsor = mongoose.model<ISponsor>('Sponsor', sponsorSchema);

// Zod validation schemas
export const insertProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  techStack: z.array(z.string()).default([])
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(1, "Message is required")
});

export const insertSponsorSchema = z.object({
  donorName: z.string().min(1, "Donor name is required"),
  message: z.string().optional(),
  amount: z.number().positive().optional()
});

// Types for API
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertSponsor = z.infer<typeof insertSponsorSchema>;

// Return types (similar to the original but with MongoDB _id)
export type Project = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured?: boolean;
  createdAt: Date;
};

export type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

export type Sponsor = {
  _id: string;
  donorName: string;
  message?: string;
  amount?: number;
  createdAt: Date;
};