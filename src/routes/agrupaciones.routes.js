import { Router } from 'express';
import { AddAgru, AddPlantadaAgru, RMPlantadaAgru, RmAgru, getAgru, getAgruPlantada } from '../controllers/agrupaciones.controller';
    const router = Router();
    router.get('/agru',getAgru)
    router.delete('/RmAgru/:uid/:pid', RmAgru )
    router.post('/AddAgrupaciones', AddAgru)
    router.get('/agruP',getAgruPlantada)
    router.delete('/RmAgruP/:uid/:pid',RMPlantadaAgru)
    router.post('/AddAgruP', AddPlantadaAgru)

export default router;