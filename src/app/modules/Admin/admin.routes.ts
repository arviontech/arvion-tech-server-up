import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';
import { AdminController } from './admin.controller';
import validateData from '../../middleware/validateRequest';
import { adminSchemaValidation } from './admin.validation';

const router = Router();
router.get(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  AdminController.getAllAdminFromDB,
);

router.post(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  validateData(adminSchemaValidation),
  AdminController.createAdminIntoDB,
);

export const AdminRoutes = router;
