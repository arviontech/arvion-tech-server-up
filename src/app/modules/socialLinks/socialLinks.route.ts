import express from 'express';
import { SocialLinksController } from './socialLinks.controller';

const router = express.Router();

router.post('/', SocialLinksController.createSocialLink);
router.get('/', SocialLinksController.getAllSocialLinks);
router.patch('/:id', SocialLinksController.updateSocialLink);
router.delete('/:id', SocialLinksController.deleteSocialLink);

export const SocialLinksRoutes = router;
