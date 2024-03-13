import { Router } from 'express';
import { getPublicacionesPorForo, crearPublicacion, getPublicacionesPorUsuario, eliminarPublicacion, getRespuestasUsuario, getRespuestasPublicacion, crearRespuesta } from '../controllers/publicacion.controller';

const router = Router();

router.get('/foro/:foroId', getPublicacionesPorForo);
router.get('/usuario/:userId', getPublicacionesPorUsuario);
router.get('/respuestas/:publicacionId', getRespuestasPublicacion);
router.get('/respuestas/:userId', getRespuestasUsuario);
router.post('/crearPublicacion', crearPublicacion);
router.post('/crearRespuesta', crearRespuesta);
router.delete('/:id', eliminarPublicacion);

export default router;