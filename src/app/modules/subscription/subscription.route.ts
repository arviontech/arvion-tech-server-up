import express from 'express';
import { SubscriptionController } from './subscription.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';

const router = express.Router();

router.post('/', SubscriptionController.createSubscription); // Keep public for user subscriptions
router.get('/', auth(UserRole.admin, UserRole.superAdmin), SubscriptionController.getAllSubscriptions);
router.delete('/:id', auth(UserRole.admin, UserRole.superAdmin), SubscriptionController.deleteSubscription);

export const SubscriptionRoutes = router;
