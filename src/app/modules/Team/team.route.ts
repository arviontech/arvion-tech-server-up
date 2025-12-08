import { Router } from 'express';
import { TeamController } from './team.controller';
import { uploadMultipleImages } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import { TeamValidation } from './team.validation';
import auth from '../../middleware/auth';
import { UserRole } from '../User/user.contant';

const router = Router();

router.post(
    '/',
    auth(UserRole.admin, UserRole.superAdmin),
    uploadMultipleImages([{ name: 'team-images', maxCount: 1 }]),
    validateRequestedFileData(TeamValidation.createTeamSchema),
    TeamController.createTeam,
);

router.get('/', TeamController.getAllTeams);

router.get('/:id', TeamController.getTeamById);

router.patch(
    '/:id',
    auth(UserRole.admin, UserRole.superAdmin),
    uploadMultipleImages([{ name: 'team-images', maxCount: 1 }]),
    validateRequestedFileData(TeamValidation.updateTeamSchema),
    TeamController.updateTeam,
);

router.delete('/:id', auth(UserRole.admin, UserRole.superAdmin), TeamController.deleteTeam);

export const TeamRoutes = router;
