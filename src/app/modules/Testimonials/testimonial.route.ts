import { Router } from 'express';

import { TestimonialController } from './testimonial.controller';
import { updloadSingleImage } from '../../config/cloudinary/multer.config';
import { TestimonialValidation } from './testimonial.validation';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';


const router = Router();

router.post(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  updloadSingleImage('testimonialImage'),
  validateRequestedFileData(TestimonialValidation.createTestimonialSchema),
  TestimonialController.createTestimonial,
);

// Get all testimonials
router.get('/', TestimonialController.getAllTestimonials);

// Get a single testimonial by ID
router.get('/:id', TestimonialController.getSingleTestimonial);

// Update a testimonial by ID
router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  updloadSingleImage('testimonialImage'),
  validateRequestedFileData(TestimonialValidation.updateTestimonialSchema),
  TestimonialController.updateTestimonial,
);

// Delete a testimonial by ID
router.delete('/:id', auth(UserRole.admin, UserRole.superAdmin), TestimonialController.deleteTestimonial);

export const TestimonialRoutes = router;
