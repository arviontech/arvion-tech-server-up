import { z } from 'zod';

const createBlogSchema = z.object({
  body: z.object({
    blogTitle: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
});

const updateBlogSchema = z.object({
  body: z.object({
    blogTitle: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const BlogsValidation = {
  createBlogSchema,
  updateBlogSchema,
};
