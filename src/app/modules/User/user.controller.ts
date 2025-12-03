import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const getMeFromDB = catchAsync(async (req, res) => {
  const result = await UserService.getMe(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Profile get successfully',
    data: result,
  });
});

// // const updateMyProfile = catchAsync(async (req, res) => {
// //   const result = await UserService.updateMyProfile(req)

// //   sendResponse(res, {
// //     statusCode: httpStatus.OK,
// //     message: 'Profile updated successfully',
// //     data: result,
// //   })
// // })

// // const updateUserProfileByAdmin = catchAsync(async (req, res) => {
// //   const result = await UserService.updateUserProfileByAdmin(req)

// //   sendResponse(res, {
// //     statusCode: httpStatus.OK,
// //     message: 'User profile updated successfully',
// //     data: result,
// //   })
// // })

// // const deleteUser = catchAsync(async (req, res) => {
// //   const { id } = req.params
// //   const result = await UserService.deleteUser(id)
// //   sendResponse(res, {
// //     statusCode: httpStatus.OK,
// //     message: 'User deleted successfully',
// //     data: result,
// //   })
// // })

export const UserController = {
  getMeFromDB,
  // deleteUser,

  // updateMyProfile,
  // updateUserProfileByAdmin,
};
