import { Router } from 'express';

import { BlogController } from './blog.controller';
import { uploadAuthorAndBlogImage } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import { BlogsValidation } from './blog.validation';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';

const router = Router();

router.post(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  uploadAuthorAndBlogImage,
  validateRequestedFileData(BlogsValidation.createBlogSchema),
  BlogController.createBlog,
);

// Get all blogs
router.get('/', BlogController.getAllBlogs);

// Get a single blog by ID
router.get('/:id', BlogController.getSingleBlog);

// Update a blog by ID
router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  uploadAuthorAndBlogImage,
  validateRequestedFileData(BlogsValidation.updateBlogSchema),
  BlogController.updateBlog,
);

// Delete a blog by ID
router.delete('/:id', auth(UserRole.admin, UserRole.superAdmin), BlogController.deleteBlog);

export const BlogRoutes = router;
