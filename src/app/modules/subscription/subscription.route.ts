import express from 'express';
import { SubscriptionController } from './subscription.controller';

const router = express.Router();

router.post('/', SubscriptionController.createSubscription);
router.get('/', SubscriptionController.getAllSubscriptions);
router.delete('/:id', SubscriptionController.deleteSubscription);

export const SubscriptionRoutes = router;
