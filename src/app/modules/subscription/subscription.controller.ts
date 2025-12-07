import { Request, Response } from 'express';
import { SubscriptionService } from './subscription.service';

const createSubscription = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await SubscriptionService.createSubscription(email);
    res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Email already subscribed',
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to subscribe',
      });
    }
  }
};

const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const result = await SubscriptionService.getAllSubscriptions();
    res.status(200).json({
      success: true,
      message: 'Subscriptions retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to get subscriptions',
    });
  }
};

const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await SubscriptionService.deleteSubscription(id);
    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete subscription',
    });
  }
};

export const SubscriptionController = {
  createSubscription,
  getAllSubscriptions,
  deleteSubscription,
};
