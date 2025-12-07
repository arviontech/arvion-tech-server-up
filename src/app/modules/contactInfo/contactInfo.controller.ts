import { Request, Response } from 'express';
import { ContactInfoService } from './contactInfo.service';

const createContactInfo = async (req: Request, res: Response) => {
  try {
    const result = await ContactInfoService.createContactInfo(req.body);
    res.status(201).json({
      success: true,
      message: 'Contact info created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create contact info',
    });
  }
};

const getContactInfo = async (req: Request, res: Response) => {
  try {
    const result = await ContactInfoService.getContactInfo();
    res.status(200).json({
      success: true,
      message: 'Contact info retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to get contact info',
    });
  }
};

const updateContactInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ContactInfoService.updateContactInfo(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Contact info updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update contact info',
    });
  }
};

const deleteContactInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ContactInfoService.deleteContactInfo(id);
    res.status(200).json({
      success: true,
      message: 'Contact info deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete contact info',
    });
  }
};

export const ContactInfoController = {
  createContactInfo,
  getContactInfo,
  updateContactInfo,
  deleteContactInfo,
};
