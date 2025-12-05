import { z } from 'zod';

const createTeamSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
    role: z.string({
        required_error: 'Role is required',
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
