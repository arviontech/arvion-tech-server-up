import { Router } from 'express';
import { StatsController } from './stats.controller';

const router = Router();

router.get('/', StatsController.getDashboardStats);

export const StatsRoutes = router;
