import { z } from 'zod';

// Zod schema for GitHub links validation
// const githubSchema = z.object({
//   frontend: z.string().url('Frontend GitHub link must be a valid URL'),
//   backend: z.string().url('Backend GitHub link must be a valid URL'),
// });

// Zod schema for project validation
const createProjectSchema = z.object({
  slug: z.string().nonempty('Slug is required'),
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
  live: z.string().url('Live URL must be a valid URL').optional(),
  technologies: z.array(z.string().nonempty('Technology name is required')),
});

// Zod schema for updating a project (all fields optional)
const updateProjectSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  live: z.string().url('Live URL must be a valid URL').optional(),
  technologies: z.array(z.string().nonempty()).optional(),
});

export const ProjectsValidation = {
  createProjectSchema,
  updateProjectSchema,
};
