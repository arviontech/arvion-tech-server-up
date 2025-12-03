import { Types } from 'mongoose';

type TGender = 'male' | 'female';

export interface IAdmin {
  fullName: string;
  user: Types.ObjectId;
  email: string;
  profileImage?: string;
  address?: string;
  isDeleted: boolean;
}
