import { Router } from 'express';
import { PackageController } from './packages.controller';
import auth from '../../middleware/auth';

const router = Router();

router.post('/', auth('admin', 'superAdmin'), PackageController.createPackage);
router.get('/', PackageController.getAllPackages);
router.get('/:id', PackageController.getPackageById);
router.put('/:id', auth('admin', 'superAdmin'), PackageController.updatePackage);
router.delete('/:id', auth('admin', 'superAdmin'), PackageController.deletePackage);

export const PackageRoutes = router;
