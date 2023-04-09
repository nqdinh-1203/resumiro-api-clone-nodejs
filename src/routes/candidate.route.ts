import { Router } from 'express';
import candidateController from '../controllers/CandidateController';

const router = Router();

router.get('/:id', candidateController.getCandidateById);
router.patch('/:id', candidateController.updateInfor);
router.patch('/:id/about', candidateController.updateAbout);
router.post('/:id/skill', candidateController.insertSkill);
router.delete('/:id/skill', candidateController.deleteSkill);


router.get('/', candidateController.index);

export default router;