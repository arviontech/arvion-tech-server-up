import { Schema, model } from 'mongoose';
import { Skill_Category, TSkill } from './skill.interface';

const skillSchema = new Schema<TSkill>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: Skill_Category,
    },
    icon: { type: String, required: true },
  },
  { timestamps: true },
);

export const Skill = model<TSkill>('Skill', skillSchema);
