import { Router } from 'express';
import { TeamController } from './team.controller';
import { uploadMultipleImages } from '../../config/cloudinary/multer.config';
import { validateRequestedFileData } from '../../middleware/validateRequestedFileData';
import { TeamValidation } from './team.validation';

const router = Router();

router.post(
    '/',
    uploadMultipleImages([{ name: 'team-images', maxCount: 1 }]),
    validateRequestedFileData(TeamValidation.createTeamSchema),
    TeamController.createTeam,
);

router.get('/', TeamController.getAllTeams);

router.get('/:id', TeamController.getTeamById);

router.patch(
    '/:id',
    uploadMultipleImages([{ name: 'team-images', maxCount: 1 }]),
    validateRequestedFileData(TeamValidation.updateTeamSchema),
    TeamController.updateTeam,
);

router.delete('/:id', TeamController.deleteTeam);

export const TeamRoutes = router;
