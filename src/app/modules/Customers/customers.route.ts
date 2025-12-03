import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';
import { CustomersController } from './customers.controller';

const router = Router();
router.get(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  CustomersController.getAllCustomers,
);

router.get(
  '/:id',
  auth(...Object.values(UserRole)),
  CustomersController.getSingleCustomer,
);

export const CustomersRoutes = router;
