import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { UserRole } from './user.contant';

const router = Router();

router.get(
  '/me',
  auth(UserRole.admin, UserRole.customer, UserRole.superAdmin),
  UserController.getMeFromDB,
);

// router.delete('/:id', auth(UserRole.admin), UserController.deleteUser)

// router.patch(
//   '/update-my-profile',
//   auth(UserRole.admin, UserRole.customer),
//   updloadSingleImage('profileImage'),
//   validateRequestedFileData(updateCustomerSchemaValidation), // optional
//   UserController.updateMyProfile
// )

// router.patch(
//   '/update-user-profile/:id',
//   auth(UserRole.superAdmin),
//   updloadSingleImage('profileImage'),
//   // validateRequestedFileData(updateUserValidationSchema), // optional
//   UserController.updateUserProfileByAdmin
// )

export const UserRoutes = router;
