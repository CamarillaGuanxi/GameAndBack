import { Router } from 'express';
import { getForos, getForoById } from '../controllers/foro.controller';

const router = Router();

router.get('/', getForos);
router.get('/:id', getForoById);

export default router;
