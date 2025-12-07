import { SocialLink, ISocialLink } from './socialLinks.model';

const createSocialLink = async (payload: Partial<ISocialLink>): Promise<ISocialLink> => {
  const result = await SocialLink.create(payload);
  return result;
};

const getAllSocialLinks = async (): Promise<ISocialLink[]> => {
  const result = await SocialLink.find({ isActive: true }).sort({ order: 1 });
  return result;
};

const updateSocialLink = async (id: string, payload: Partial<ISocialLink>): Promise<ISocialLink | null> => {
  const result = await SocialLink.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSocialLink = async (id: string): Promise<ISocialLink | null> => {
  const result = await SocialLink.findByIdAndDelete(id);
  return result;
};

export const SocialLinksService = {
  createSocialLink,
  getAllSocialLinks,
  updateSocialLink,
  deleteSocialLink,
};
