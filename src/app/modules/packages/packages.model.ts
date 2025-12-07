import { Schema, model } from 'mongoose';

export interface IPackage {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  color: string;
  order?: number;
}

const packageSchema = new Schema<IPackage>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String, required: true }],
    popular: { type: Boolean, default: false },
    color: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Package = model<IPackage>('Package', packageSchema);
