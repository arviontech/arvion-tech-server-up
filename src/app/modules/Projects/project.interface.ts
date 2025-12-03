import { Types } from 'mongoose';

// Define the structure of a project document
export interface TProject {
  slug: string; //for dynamic route
  title: string;
  description: string;
  live?: string;
  technologies: [Types.ObjectId];
  images: string[];
  forSale?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
