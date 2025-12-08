import { Router } from 'express';
import { ProjectController } from './project.controller';
import { uploadMultipleImages } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import { ProjectsValidation } from './project.validation';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';

const router = Router();

router.post(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  uploadMultipleImages([{ name: 'project-images', maxCount: 10 }]),
  validateRequestedFileData(ProjectsValidation.createProjectSchema),
  ProjectController.createProject,
);

// Get all projects
router.get('/', ProjectController.getAllProjects);

// Get a single project by slug (must come before /:id route)
router.get('/slug/:slug', ProjectController.getProjectBySlug);

// Get a single project by ID
router.get('/:id', ProjectController.getProjectById);

// Update a project by ID
router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  uploadMultipleImages([{ name: 'project-images', maxCount: 10 }]),
  validateRequestedFileData(ProjectsValidation.updateProjectSchema),
  ProjectController.updateProject,
);

// Delete a project by ID
router.delete(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  ProjectController.deleteProject,
);

export const ProjectRoutes = router;
