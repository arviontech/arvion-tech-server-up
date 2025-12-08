import express from 'express';
import { ContactInfoController } from './contactInfo.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';

const router = express.Router();

router.post('/', auth(UserRole.admin, UserRole.superAdmin), ContactInfoController.createContactInfo);
router.get('/', ContactInfoController.getContactInfo);
router.patch('/:id', auth(UserRole.admin, UserRole.superAdmin), ContactInfoController.updateContactInfo);
router.delete('/:id', auth(UserRole.admin, UserRole.superAdmin), ContactInfoController.deleteContactInfo);

export const ContactInfoRoutes = router;
