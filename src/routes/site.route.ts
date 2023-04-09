import { Router } from 'express';
import siteController from '../controllers/SiteController';

const router = Router();


router.get('/', siteController.index);

export default router;