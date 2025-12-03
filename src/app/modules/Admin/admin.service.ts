import mongoose from 'mongoose';
import { AppError } from '../../Error/AppError';
import { UserRole } from '../User/user.contant';
import { IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import QueryBuilder from '../../builder/QueryBuilder';

// //create-admin
const createAdmin = async (payload: any) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const userData: Partial<IUser> = {};

  //user-data
  userData.email = payload.email;
  userData.password = payload.password;
  userData.role = UserRole.admin;
  userData.isVerified = true;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const createUser = await User.create([userData], { session });

    if (!createUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Account Registration failed');
    }

    if (createUser.length > 0) {
      //Admin Data
      const adminData: Partial<IAdmin> = {};

      adminData.fullName = payload.fullName;
      adminData.user = createUser[0]._id;
      adminData.email = payload.email;
      adminData.profileImage = payload.profileImage || '';
      adminData.address = payload.address || '';
      const createdAdmin = await Admin.create([adminData], { session });

      if (!createdAdmin.length) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Account Registration failed',
        );
      }

      await session.commitTransaction();
      await session.endSession();

      return createdAdmin[0];
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

// //get all Admin
const getAllAdmin = async (query: Record<string, unknown>) => {
  const searchableFields = ['fullName', 'email'];

  const adminQueryBuilder = new QueryBuilder(
    Admin.find().populate('user'),
    query,
  )
    .search(searchableFields)
    .filter();

  // count the total before pagination
  const meta = await adminQueryBuilder.countTotal();

  // now get the data with remaining method
  const data = await adminQueryBuilder.sort().pagination().fields().modelQuery;

  return {
    meta,
    data,
  };
};

export const AdminService = {
  createAdmin,
  getAllAdmin,
};
