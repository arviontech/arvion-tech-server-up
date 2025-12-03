import { Router } from 'express';
import { ProjectController } from './project.controller';
import { uploadMultipleImages } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import { ProjectsValidation } from './project.validation';


const router = Router();

router.post(
  '/',
  uploadMultipleImages([{ name: 'project-images', maxCount: 10 }]),
  validateRequestedFileData(ProjectsValidation.createProjectSchema),
  ProjectController.createProject,
);

// Get all projects
router.get('/', ProjectController.getAllProjects);

// Get a single project by ID
router.get('/:id', ProjectController.getProjectById);

// Get a single project by slug
router.get('/:slug', ProjectController.getProjectBySlug);

// Update a project by ID
router.patch(
  '/:id',
  uploadMultipleImages([{ name: 'project-images', maxCount: 10 }]),
  validateRequestedFileData(ProjectsValidation.updateProjectSchema),
  ProjectController.updateProject,
);

export const ProjectRoutes = router;
