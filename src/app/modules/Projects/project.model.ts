import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    live: {
      type: String,
    },
    technologies: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'Skill',
    },
    images: {
      type: [String],
      required: true,
    },
    forSale: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = model<TProject>('Project', projectSchema);
