import express from 'express';
import { SocialLinksController } from './socialLinks.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';

const router = express.Router();

router.post('/', auth(UserRole.admin, UserRole.superAdmin), SocialLinksController.createSocialLink);
router.get('/', SocialLinksController.getAllSocialLinks);
router.patch('/:id', auth(UserRole.admin, UserRole.superAdmin), SocialLinksController.updateSocialLink);
router.delete('/:id', auth(UserRole.admin, UserRole.superAdmin), SocialLinksController.deleteSocialLink);

export const SocialLinksRoutes = router;
