import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    authorImage: {
      type: String,
    },
    blogTitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    blogImage: {
      type: [String],

    },
  },
  { timestamps: true },
);

export const Blog = model<IBlog>('Blog', blogSchema);
