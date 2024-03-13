import { Router } from 'express';
import { getGuias, getPlantadas, getPlantas, getPasos, nextStep, delPlantada, regar, addPlantada } from '../controllers/planta.controller';
import { authenticateToken } from '..';

const router = Router();

router.get('/', getPlantas);
router.get('/guia/:id', getGuias);
router.get('/plantadas', getPlantadas);
router.get('/pasos', getPasos);
router.put('/nextStep/:plantadaId', nextStep);
router.delete('/delPlantada/:plantadaId', delPlantada);
router.put('/regar/:plantadaId', regar);
router.post('/addPlant', addPlantada)

export default router;