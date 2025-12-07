import { Schema, model } from 'mongoose';

export interface IContactInfo {
  _id?: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const contactInfoSchema = new Schema<IContactInfo>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactInfo = model<IContactInfo>('ContactInfo', contactInfoSchema);
