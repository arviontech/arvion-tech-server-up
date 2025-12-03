import { Router } from 'express';

import { BlogController } from './blog.controller';
import { uploadAuthorAndBlogImage } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import { BlogsValidation } from './blog.validation';

const router = Router();

router.post(
  '/',
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
  uploadAuthorAndBlogImage,
  validateRequestedFileData(BlogsValidation.updateBlogSchema),
  BlogController.updateBlog,
);

// Delete a blog by ID
router.delete('/:id', BlogController.deleteBlog);

export const BlogRoutes = router;
