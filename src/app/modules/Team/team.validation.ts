import { z } from 'zod';

const createTeamSchema = z.object({
  name: z.string({
    message: 'Name is required',
  }),
  role: z.string({
    message: 'Role is required',
  }),
});

const updateTeamSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
});

export const TeamValidation = {
  createTeamSchema,
  updateTeamSchema,
};
