import { ContactInfo, IContactInfo } from './contactInfo.model';

const createContactInfo = async (payload: Partial<IContactInfo>): Promise<IContactInfo> => {
  const result = await ContactInfo.create(payload);
  return result;
};

const getContactInfo = async (): Promise<IContactInfo | null> => {
  const result = await ContactInfo.findOne().sort({ createdAt: -1 });
  return result;
};

const updateContactInfo = async (id: string, payload: Partial<IContactInfo>): Promise<IContactInfo | null> => {
  const result = await ContactInfo.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteContactInfo = async (id: string): Promise<IContactInfo | null> => {
  const result = await ContactInfo.findByIdAndDelete(id);
  return result;
};

export const ContactInfoService = {
  createContactInfo,
  getContactInfo,
  updateContactInfo,
  deleteContactInfo,
};
