import { Router } from 'express';
import { authenticateToken } from '..';
import { crearSala, getAllSalas, getSalaFromUser, getAllEtiquetas, getAllTipoPartidas, getAllCategorias, addUserInSala, deleteUserFromSala, getUsersFromSala, deleteSala, cambiarLider } from '../controllers/sala.controller';
const router = Router();
/**
 * @openapi
 * /salas/allSalas/{idJuego}:
 *   get:
 *     tags:
 *     - Salas
 *     summary: Obtener todas las salas de un juego
 *     description: Obtiene todas las salas de un juego especificado por su ID
 *     parameters:
 *       - in: path
 *         name: idJuego
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del juego del cual se desean obtener las salas
 *     responses:
 *       200:
 *         description: Lista de salas obtenida con éxito
 *       500:
 *         description: Error al obtener las salas del juego
 */
router.get('/allSalas/:idJuego', authenticateToken, getAllSalas);
/**
 * @openapi
 * /salas/allEtiquetas/{idJuego}:
 *   get:
 *     tags:
 *     - Salas
 *     summary: Obtener todas las etiquetas de un juego
 *     description: Obtiene todas las etiquetas de un juego especificado por su ID
 *     parameters:
 *       - in: path
 *         name: idJuego
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del juego del cual se desean obtener las etiquetas
 *     responses:
 *       200:
 *         description: Lista de etiquetas obtenida con éxito
 *       500:
 *         description: Error al obtener las etiquetas del juego
 */
router.get('/allEtiquetas/:idJuego', authenticateToken, getAllEtiquetas);
/**
 * @openapi
 * /salas/allCategorias/{idJuego}:
 *   get:
 *     tags:
 *     - Salas
 *     summary: Obtener todas las categorías de un juego
 *     description: Obtiene todas las categorías de un juego especificado por su ID
 *     parameters:
 *       - in: path
 *         name: idJuego
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del juego del cual se desean obtener las categorías
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito
 *       500:
 *         description: Error al obtener las categorías del juego
 */
router.get('/allCategorias/:idJuego', authenticateToken, getAllCategorias);
/**
 * @openapi
 * /salas/crearSala:
 *   post:
 *     tags:
 *     - Salas
 *     summary: Crear una nueva sala
 *     description: Crea una nueva sala con los datos proporcionados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoPartida:
 *                 type: string
 *               servidor:
 *                 type: string
 *               idioma:
 *                 type: string
 *               numeroJugadores:
 *                 type: integer
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
 *         description: Sala creada con éxito
 *       500:
 *         description: Error al crear la sala
 */
router.post('/crearSala', authenticateToken, crearSala);
/**
 * @openapi
 * /salas/allTipoPartidas/{idJuego}:
 *   get:
 *     tags:
 *     - Salas
 *     summary: Obtener todos los tipos de partidas de un juego
 *     description: Obtiene todos los tipos de partidas de un juego especificado por su ID
 *     parameters:
 *       - in: path
 *         name: idJuego
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del juego del cual se desean obtener los tipos de partidas
 *     responses:
 *       200:
 *         description: Lista de tipos de partidas obtenida con éxito
 *       500:
 *         description: Error al obtener los tipos de partidas del juego
 */
router.get('/allTipoPartidas/:idJuego', authenticateToken, getAllTipoPartidas);
/**
 * @openapi
 * /salas/addUserInSala:
 *   post:
 *     tags:
 *     - Salas
 *     summary: Agregar usuario a una sala
 *     description: Agrega un usuario a una sala existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idSala:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario agregado a la sala con éxito
 *       500:
 *         description: Error al agregar usuario a la sala
 */
router.post('/addUserInSala', authenticateToken, addUserInSala);
/**
 * @openapi
 * /salas/deleteUserFromSala/{idSala}:
 *   delete:
 *     tags:
 *     - Salas
 *     summary: Eliminar usuario de una sala
 *     description: Elimina un usuario de una sala existente
 *     parameters:
 *       - in: path
 *         name: idSala
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la sala de la cual se desea eliminar el usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado de la sala con éxito
 *       500:
 *         description: Error al eliminar usuario de la sala
 */
router.delete('/deleteUserFromSala/:idSala', authenticateToken, deleteUserFromSala);
/**
 * @openapi
 * /salas/getUsersFromSala/{idSala}:
 *   get:
 *     tags:
 *     - Salas
 *     summary: Obtener usuarios de una sala
 *     description: Obtiene todos los usuarios de una sala especificada por su ID
 *     parameters:
 *       - in: path
 *         name: idSala
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la sala de la cual se desean obtener los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       500:
 *         description: Error al obtener los usuarios de la sala
 */
router.get('/getUsersFromSala/:idSala', authenticateToken, getUsersFromSala);
/**
 * @openapi
 * /salas/salaFromUser/{idUsuario}:
 *   get:
 *     tags:
 *     - Salas
 *     summary: Obtener sala de un usuario
 *     description: Obtiene la sala a la cual pertenece un usuario especificado por su ID
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del usuario del cual se desea obtener la sala
 *     responses:
 *       200:
 *         description: Sala obtenida con éxito
 *       500:
 *         description: Error al obtener la sala del usuario
 */
router.get('/salaFromUser/:idUsuario', authenticateToken, getSalaFromUser);
/**
 * @openapi
 * /salas/deleteSala/{idSala}:
 *   delete:
 *     tags:
 *     - Salas
 *     summary: Eliminar una sala
 *     description: Elimina una sala especificada por su ID
 *     parameters:
 *       - in: path
 *         name: idSala
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la sala que se desea eliminar
 *     responses:
 *       200:
 *         description: Sala eliminada con éxito
 *       500:
 *         description: Error al eliminar la sala
 */
router.delete('/deleteSala/:idSala', authenticateToken, deleteSala)

/**
 * @openapi
 * /salas/cambiarLider/{idSala}/{idUsuario}:
 *   post:
 *     tags:
 *     - Salas
 *     summary: Modificar el lider de una sala
 *     description: Modificar el lider de una sala
 *     parameters:
 *       - in: path
 *         name: idSala
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la sala donde se cambiará el líder
 *       - in: query
 *         name: idUsuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del nuevo líder de la sala
 *     responses:
 *       200:
 *         description: Lider modificado con exito
 *       500:
 *         description: Error el lider no se pudo modificar
 */

router.post('/cambiarLider/:idSala/:idUsuario', authenticateToken, cambiarLider);

export default router;