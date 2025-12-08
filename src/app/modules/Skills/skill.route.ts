import { Router } from 'express';
import { SkillController } from './skill.controller';
import { skillValidationSchema } from './skill.validation';
import { updloadSingleImage } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';


const router = Router();

router.post(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  updloadSingleImage('icon'),
  validateRequestedFileData(skillValidationSchema),
  SkillController.createSkill,
);

// Get all skills
router.get('/', SkillController.getAllSkills);

// Delete a skill by ID
router.delete('/:id', auth(UserRole.admin, UserRole.superAdmin), SkillController.deleteSkill);

export const SkillRoutes = router;
