import { z } from 'zod';

const createTestimonialSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
    title: z.string().nonempty(),
    review: z.string().nonempty(),
    date: z.string().nonempty(),
  }),
});

const updateTestimonialSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    review: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const TestimonialValidation = {
  createTestimonialSchema,
  updateTestimonialSchema,
};
