import { Subscription, ISubscription } from './subscription.model';

const createSubscription = async (email: string): Promise<ISubscription> => {
  const result = await Subscription.create({ email });
  return result;
};

const getAllSubscriptions = async (): Promise<ISubscription[]> => {
  const result = await Subscription.find({ isActive: true }).sort({ createdAt: -1 });
  return result;
};

const deleteSubscription = async (id: string): Promise<ISubscription | null> => {
  const result = await Subscription.findByIdAndUpdate(id, { isActive: false }, { new: true });
  return result;
};

export const SubscriptionService = {
  createSubscription,
  getAllSubscriptions,
  deleteSubscription,
};
