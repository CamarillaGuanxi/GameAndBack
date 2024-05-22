// routes/amigos.js

import { Router } from 'express';
import { authenticateToken } from '..';
import { aceptarSolicitudes, eliminarAmigo, enviarSolicitud, enviarSolicitudNombre, getAmigos, getSolicitudes, rechazarSolicitudes } from '../controllers/amigos.controller';
const router = Router();
/**
 * @openapi
 * /amigos/getAmigos:
 *   get:
 *     tags:
 *     - Amigos
 *     summary: Obtiene la lista de amigos
 *     description: Obtiene la lista de amigos del usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de amigos obtenida con éxito
 *       500:
 *         description: Error al obtener la lista de amigos
 */
router.get('/getAmigos', authenticateToken, getAmigos);

/**
 * @openapi
 * /amigos/getSolicitudes:
 *   get:
 *     tags:
 *     - Amigos
 *     summary: Obtener solicitudes de amistad
 *     description: Obtiene la lista de solicitudes de amistad del usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de solicitudes obtenida con éxito
 *       500:
 *         description: Error al obtener la lista de solicitudes
 */
router.get('/getSolicitudes', authenticateToken, getSolicitudes);

/**
 * @openapi
 * /amigos/aceptarSolicitudes:
 *   post:
 *     tags:
 *     - Amigos
 *     summary: Aceptar una solicitud de amistad
 *     description: Acepta una solicitud de amistad enviada al usuario autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SolicitudId:
 *                 type: integer
 *               SolicitanteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Solicitud aceptada con éxito
 *       500:
 *         description: Error al aceptar la solicitud
 */
router.post('/aceptarSolicitudes', authenticateToken, aceptarSolicitudes);

/**
 * @openapi
 * /amigos/rechazarSolicitudes:
 *   delete:
 *     tags:
 *     - Amigos
 *     summary: Rechazar una solicitud de amistad
 *     description: Rechaza una solicitud de amistad enviada al usuario autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SolicitudId:
 *                 type: integer
 *               SolicitanteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Solicitud rechazada con éxito
 *       500:
 *         description: Error al rechazar la solicitud
 */
router.delete('/rechazarSolicitudes', authenticateToken, rechazarSolicitudes);

/**
 * @openapi
 * /amigos/eliminarAmigo:
 *   delete:
 *     tags:
 *     - Amigos
 *     summary: Eliminar un amigo
 *     description: Elimina un amigo de la lista de amigos del usuario autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AmigoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Amigo eliminado con éxito
 *       500:
 *         description: Error al eliminar al amigo
 */
router.delete('/eliminarAmigo', authenticateToken, eliminarAmigo);

/**
 * @openapi
 * /amigos/enviarSolicitud:
 *   post:
 *     tags:
 *     - Amigos
 *     summary: Enviar solicitud de amistad
 *     description: Envía una solicitud de amistad a otro usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SolicitadoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Solicitud enviada con éxito
 *       500:
 *         description: Error al enviar la solicitud
 */
router.post('/enviarSolicitud', authenticateToken, enviarSolicitud);

/**
 * @openapi
 * /amigos/enviarSolicitudNombre:
 *   post:
 *     tags:
 *     - Amigos
 *     summary: Enviar solicitud de amistad por nombre
 *     description: Envía una solicitud de amistad a otro usuario utilizando su nombre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Solicitado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud enviada con éxito
 *       500:
 *         description: Error al enviar la solicitud
 */
router.post('/enviarSolicitudNombre', authenticateToken, enviarSolicitudNombre);
/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/healthcheck", (req, res) => res.sendStatus(200));




export default router;