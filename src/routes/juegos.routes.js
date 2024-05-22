import { Router } from 'express';
import { authenticateToken } from '..';
import { getJuegos } from '../controllers/juegos.controller';
const router = Router();
/**
 * @openapi
 * /juego/:
 *   get:
 *     tags:
 *     - Juegos
 *     summary: Obtener todos los juegos
 *     description: Obtiene una lista de todos los juegos disponibles
 *     responses:
 *       200:
 *         description: Lista de juegos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Nombre del Juego"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.get('/', authenticateToken, getJuegos);


export default router;