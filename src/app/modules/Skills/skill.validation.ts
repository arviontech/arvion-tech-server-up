import { z } from 'zod';
import { Skill_Category } from './skill.interface';

export const skillValidationSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(Object.values(Skill_Category) as [string, ...string[]], {
    message: 'Skill category is required',
  }),

});
