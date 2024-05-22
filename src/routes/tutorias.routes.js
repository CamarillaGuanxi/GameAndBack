import { Router } from 'express';
import { authenticateToken } from '..';
import { getTutorias, getMisClases, deleteTutorias, desmatricularse, crearClase, creatTutoria, getAllEtiquetasTutorias, getAllCategoriasTutorias, tutoriasImpartidas, getParticipantesClase } from '../controllers/tutorias.controller';
const router = Router();
/**
 * @openapi
 * /tutorias/getTutorias:
 *   get:
 *     tags:
 *     - Tutorías
 *     summary: Obtener todas las tutorías
 *     description: Obtiene todas las tutorías disponibles
 *     responses:
 *       200:
 *         description: Lista de tutorías obtenida con éxito
 *       500:
 *         description: Error al obtener las tutorías
 */
router.get('/getTutorias', authenticateToken, getTutorias);

/**
 * @openapi
 * /tutorias/getMisClases:
 *   get:
 *     tags:
 *     - Tutorías
 *     summary: Obtener mis clases
 *     description: Obtiene todas las clases en las que el usuario está inscrito
 *     responses:
 *       200:
 *         description: Lista de clases obtenida con éxito
 *       500:
 *         description: Error al obtener las clases
 */
router.get('/getMisClases', authenticateToken, getMisClases);

/**
 * @openapi
 * /tutorias/deleteTutorias/{idTutoria}:
 *   delete:
 *     tags:
 *     - Tutorías
 *     summary: Eliminar una tutoría
 *     description: Elimina una tutoría especificada por su ID
 *     parameters:
 *       - in: path
 *         name: idTutoria
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la tutoría a eliminar
 *     responses:
 *       200:
 *         description: Tutoría eliminada con éxito
 *       500:
 *         description: Error al eliminar la tutoría
 */
router.delete('/deleteTutorias/:idTutoria', authenticateToken, deleteTutorias);

/**
 * @openapi
 * /tutorias/desmatricularse/{idclase}:
 *   delete:
 *     tags:
 *     - Tutorías
 *     summary: Desmatricularse de una clase
 *     description: Permite al usuario desmatricularse de una clase especificada por su ID
 *     parameters:
 *       - in: path
 *         name: idclase
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la clase de la que el usuario desea desmatricularse
 *     responses:
 *       200:
 *         description: Desmatriculación realizada con éxito
 *       500:
 *         description: Error al desmatricularse de la clase
 */
router.delete('/desmatricularse/:idclase', authenticateToken, desmatricularse);

/**
 * @openapi
 * /tutorias/crearClase/{tutoria}:
 *   post:
 *     tags:
 *     - Tutorías
 *     summary: Crear una clase
 *     description: Crea una nueva clase para una tutoría especificada por su ID
 *     parameters:
 *       - in: path
 *         name: tutoria
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la tutoría para la cual se creará la clase
 *     responses:
 *       200:
 *         description: Clase creada con éxito
 *       500:
 *         description: Error al crear la clase
 */
router.post('/crearClase/:tutoria', authenticateToken, crearClase);

/**
 * @openapi
 * /tutorias/crearTutoria:
 *   post:
 *     tags:
 *     - Tutorías
 *     summary: Crear una nueva tutoría
 *     description: Crea una nueva tutoría con los detalles proporcionados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precio:
 *                 type: integer
 *               servidor:
 *                 type: string
 *               idioma:
 *                 type: string
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idJuego:
 *                 type: integer
 *               etiquetas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *               plataforma:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tutoría creada con éxito
 *       500:
 *         description: Error al crear la tutoría
 */
router.post('/crearTutoria', authenticateToken, creatTutoria);

/**
 * @openapi
 * /tutorias/getEtiquetasTutorias:
 *   get:
 *     tags:
 *     - Tutorías
 *     summary: Obtener etiquetas de tutorías
 *     description: Obtiene todas las etiquetas disponibles para las tutorías
 *     responses:
 *       200:
 *         description: Lista de etiquetas obtenida con éxito
 *       500:
 *         description: Error al obtener las etiquetas
 */
router.get('/getEtiquetasTutorias', authenticateToken, getAllEtiquetasTutorias);

/**
 * @openapi
 * /tutorias/getCategoriasTutorias:
 *   get:
 *     tags:
 *     - Tutorías
 *     summary: Obtener categorías de tutorías
 *     description: Obtiene todas las categorías disponibles para las tutorías
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito
 *       500:
 *         description: Error al obtener las categorías
 */
router.get('/getCategoriasTutorias', authenticateToken, getAllCategoriasTutorias);

/**
 * @openapi
 * /tutorias/getTutoriasImpartidas:
 *   get:
 *     tags:
 *     - Tutorías
 *     summary: Obtener tutorías impartidas
 *     description: Obtiene todas las tutorías impartidas por el usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de tutorías impartidas obtenida con éxito
 *       500:
 *         description: Error al obtener las tutorías impartidas
 */
router.get('/getTutoriasImpartidas', authenticateToken, tutoriasImpartidas);

/**
 * @openapi
 * /tutorias/getParticipantesClase/{idclase}:
 *   get:
 *     tags:
 *     - Tutorías
 *     summary: Obtener participantes de una clase
 *     description: Obtiene todos los participantes de una clase especificada por su ID
 *     parameters:
 *       - in: path
 *         name: idclase
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la clase para la cual se desean obtener los participantes
 *     responses:
 *       200:
 *         description: Lista de participantes obtenida con éxito
 *       500:
 *         description: Error al obtener los participantes de la clase
 */
router.get('/getParticipantesClase/:idclase', authenticateToken, getParticipantesClase);


export default router;