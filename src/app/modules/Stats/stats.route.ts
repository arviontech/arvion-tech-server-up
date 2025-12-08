import { Router } from 'express';
import { StatsController } from './stats.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';

const router = Router();

router.get('/', auth(UserRole.admin, UserRole.superAdmin), StatsController.getDashboardStats);

export const StatsRoutes = router;
