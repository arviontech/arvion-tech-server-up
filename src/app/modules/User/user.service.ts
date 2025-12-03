import { User } from './user.model';
import { AppError } from '../../Error/AppError';
import httpStatus from 'http-status';
import { Customers } from '../Customers/customers.model';

import { UserRole } from './user.contant';
import { Admin } from '../Admin/admin.model';

import QueryBuilder from '../../builder/QueryBuilder';
import { Request } from 'express';

// export const generateUserId = (name: string): string => {
//   const cleanName = name.trim().split(" ").join("").toLowerCase();
//   const shortUuid = uuidv4().slice(0, 6); // keep it short & readable
//   return `${cleanName}-${shortUuid}`;
// };

// //get all user

// //Get me
const getMe = async (req: Request) => {
  const userID = req.user.userId;

  const isUserExist = await User.findOne({ _id: userID });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  if (isUserExist.role === UserRole.admin) {
    const getProfile = await Admin.findOne({ user: isUserExist._id }).populate(
      'user',
    );
    return getProfile;
  } else if (isUserExist.role === UserRole.customer) {
    const getProfile = await Customers.findOne({
      user: isUserExist._id,
    }).populate('user');
    return getProfile;
  } else if (isUserExist.role === UserRole.superAdmin) {
    const superAdminProfile = await User.findOne(
      { _id: userID },
      { email: 1, contactNumber: 1, role: 1, _id: 0 },
    );
    return superAdminProfile;
  }
};

// //soft delete
// // const deleteUser = async (id: string) => {
// //   const _id = id
// //   const isUserExist = await User.findById(_id)
// //   if (!isUserExist) {
// //     throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
// //   }

// //   const session = await mongoose.startSession()
// //   try {
// //     session.startTransaction()

// //     if (isUserExist.role === UserRole.customer) {
// //       await User.updateOne(
// //         { _id: _id },
// //         { $set: { isDeleted: true, status: 'INACTIVE' } },
// //         { session }
// //       )
// //       await Customers.updateOne(
// //         { user: _id },
// //         { $set: { isDeleted: true } },
// //         { session }
// //       )
// //     } else if (isUserExist.role === UserRole.admin) {
// //       await User.updateOne(
// //         { _id: _id },
// //         { $set: { isDeleted: true, status: 'INACTIVE' } },
// //         { session }
// //       )
// //       await Admin.updateOne(
// //         { user: _id },
// //         { $set: { isDeleted: true } },
// //         { session }
// //       )
// //     }
// //     await session.commitTransaction()
// //     await session.endSession()
// //   } catch (error) {
// //     await session.abortTransaction()
// //     await session.endSession()
// //     throw new AppError(httpStatus.BAD_REQUEST, 'User delete failed')
// //   }
// // }

// // const updateMyProfile = async (req: Request) => {
// //   const { userId } = req.user
// //   const payload = req.body

// //   if (req.file) {
// //     payload.profileImage = req.file.path
// //   }

// //   const user = await User.findById(userId)
// //   if (!user) {
// //     throw new AppError(httpStatus.NOT_FOUND, 'User not found')
// //   }

// //   const customer = await Customers.findOne({ user: userId })
// //   if (!customer) {
// //     throw new AppError(httpStatus.NOT_FOUND, 'Customer not found')
// //   }

// //   const filteredPayload = Object.entries(payload).reduce(
// //     (acc, [key, value]) => {
// //       if (value !== undefined && value !== null && value !== '') {
// //         acc[key] = value
// //       }
// //       return acc
// //     },
// //     {} as Record<string, any>
// //   )

// //   const updatedCustomer = await Customers.findOneAndUpdate(
// //     { user: userId },
// //     filteredPayload,
// //     {
// //       new: true,
// //     }
// //   )

// //   return updatedCustomer
// // }

// // const updateUserProfileByAdmin = async (req: Request) => {
// //   const { id } = req.params
// //   const payload = req.body

// //   if (req.file) {
// //     payload.profileImage = req.file.path
// //   }

// //   const userToUpdate = await User.findById(id)
// //   if (!userToUpdate) {
// //     throw new AppError(httpStatus.NOT_FOUND, 'User not found')
// //   }

// //   if (!['admin', 'customer'].includes(userToUpdate.role)) {
// //     throw new AppError(
// //       httpStatus.FORBIDDEN,
// //       'Only admin or customer can be updated'
// //     )
// //   }

// //   const filteredPayload = Object.entries(payload).reduce(
// //     (acc, [key, value]) => {
// //       if (value !== undefined && value !== null && value !== '') {
// //         acc[key] = value
// //       }
// //       return acc
// //     },
// //     {} as Record<string, any>
// //   )

// //   const updatedUser = await User.findByIdAndUpdate(id, filteredPayload, {
// //     new: true,
// //   }).select('-password')

// //   return updatedUser
// // }

export const UserService = {
  getMe,
  // updateMyProfile,
  // updateUserProfileByAdmin,
  // deleteUser,
};
