import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PackageService } from './packages.service';

const createPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.createPackage(req.body);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Package created successfully',
    data: result,
  });
});

const getAllPackages = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.getAllPackages();
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Packages retrieved successfully',
    data: result,
  });
});

const getPackageById = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.getPackageById(req.params.id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Package retrieved successfully',
    data: result,
  });
});

const updatePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.updatePackage(req.params.id, req.body);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Package updated successfully',
    data: result,
  });
});

const deletePackage = catchAsync(async (req: Request, res: Response) => {
  await PackageService.deletePackage(req.params.id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Package deleted successfully',
    data: null,
  });
});

export const PackageController = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
