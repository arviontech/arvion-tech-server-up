import { Router } from 'express';
import { SkillController } from './skill.controller';
import { skillValidationSchema } from './skill.validation';
import { updloadSingleImage } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';


const router = Router();

router.post(
  '/',
  updloadSingleImage('icon'),
  validateRequestedFileData(skillValidationSchema),
  SkillController.createSkill,
);

// Get all skills
router.get('/', SkillController.getAllSkills);

// Delete a skill by ID
router.delete('/:id', SkillController.deleteSkill);

export const SkillRoutes = router;
