// In client/src/types/portfolio.ts

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: string; // We will refactor this later
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  // We removed the level property
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}