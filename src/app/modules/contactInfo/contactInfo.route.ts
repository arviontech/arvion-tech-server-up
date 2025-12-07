import express from 'express';
import { ContactInfoController } from './contactInfo.controller';

const router = express.Router();

router.post('/', ContactInfoController.createContactInfo);
router.get('/', ContactInfoController.getContactInfo);
router.patch('/:id', ContactInfoController.updateContactInfo);
router.delete('/:id', ContactInfoController.deleteContactInfo);

export const ContactInfoRoutes = router;
