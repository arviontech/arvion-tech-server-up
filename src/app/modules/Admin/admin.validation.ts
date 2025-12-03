import { z } from 'zod';

export const adminSchemaValidation = z.object({
  password: z.string().nonempty('Password is required').min(8),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.email('Email is required'),
  address: z.string().optional(),
});
