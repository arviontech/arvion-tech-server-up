import { Request, Response } from 'express';
import { SocialLinksService } from './socialLinks.service';

const createSocialLink = async (req: Request, res: Response) => {
  try {
    const result = await SocialLinksService.createSocialLink(req.body);
    res.status(201).json({
      success: true,
      message: 'Social link created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create social link',
    });
  }
};

const getAllSocialLinks = async (req: Request, res: Response) => {
  try {
    const result = await SocialLinksService.getAllSocialLinks();
    res.status(200).json({
      success: true,
      message: 'Social links retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to get social links',
    });
  }
};

const updateSocialLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await SocialLinksService.updateSocialLink(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Social link updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update social link',
    });
  }
};

const deleteSocialLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await SocialLinksService.deleteSocialLink(id);
    res.status(200).json({
      success: true,
      message: 'Social link deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete social link',
    });
  }
};

export const SocialLinksController = {
  createSocialLink,
  getAllSocialLinks,
  updateSocialLink,
  deleteSocialLink,
};
