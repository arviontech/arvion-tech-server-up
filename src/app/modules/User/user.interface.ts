import { TStatus } from '../../interface/common.interface';

type TRole = 'customer' | 'admin' | 'superAdmin';

export interface IUser {
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: TRole;
  status: TStatus;
  isVerified: boolean;
  isDeleted: boolean;
}
