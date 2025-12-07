import { Package, IPackage } from './packages.model';

const createPackage = async (payload: IPackage) => {
  const result = await Package.create(payload);
  return result;
};

const getAllPackages = async () => {
  const result = await Package.find().sort({ order: 1, createdAt: 1 });
  return result;
};

const getPackageById = async (id: string) => {
  const result = await Package.findById(id);
  return result;
};

const updatePackage = async (id: string, payload: Partial<IPackage>) => {
  const result = await Package.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletePackage = async (id: string) => {
  const result = await Package.findByIdAndDelete(id);
  return result;
};

export const PackageService = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
