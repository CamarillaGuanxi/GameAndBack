import { Router } from 'express';
import { getUserData, loginUser, createUser, getUsersAccount, addUsersAccount, deleteUserAccounts, updateUserData, changeEmail, changePassword, changeProfilePictureId, changeFullName, changeAddress, changeCity, changeState, changeCountry, changePostalCode, getAmigosUsersAccount } from '../controllers/user.controller';
import { authenticateToken } from '..';

const router = Router();


/**
 * @openapi
 * /user/login:
 *   get:
 *     tags:
 *     - Usuarios
 *     summary: Iniciar sesión
 *     description: Autentica al usuario y genera un token de acceso
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: El correo electrónico del usuario
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: La contraseña del usuario
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.get('/login', loginUser);

/**
 * @openapi
 * /user/userData:
 *   get:
 *     tags:
 *     - Usuarios
 *     summary: Obtener datos del usuario
 *     description: Obtiene los datos del usuario autenticado
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos con éxito
 *       500:
 *         description: Error al obtener los datos del usuario
 */
router.get('/userData', authenticateToken, getUserData);

/**
 * @openapi
 * /user/userAccounts:
 *   get:
 *     tags:
 *     - Usuarios
 *     summary: Obtener cuentas del usuario
 *     description: Obtiene las cuentas asociadas al usuario autenticado
 *     responses:
 *       200:
 *         description: Cuentas obtenidas con éxito
 *       500:
 *         description: Error al obtener las cuentas del usuario
 */
router.get('/userAccounts', authenticateToken, getUsersAccount);

/**
 * @openapi
 * /user/changeUserData:
 *   put:
 *     tags:
 *     - Usuarios
 *     summary: Actualizar datos del usuario
 *     description: Actualiza los datos del usuario autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               juegoFavorito:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos actualizados con éxito
 *       500:
 *         description: Error al actualizar los datos del usuario
 */
router.put('/changeUserData', authenticateToken, updateUserData);

/**
 * @openapi
 * /user/addUserAccounts:
 *   post:
 *     tags:
 *     - Usuarios
 *     summary: Agregar cuenta de usuario
 *     description: Agrega una nueva cuenta asociada al usuario autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCuenta:
 *                 type: string
 *               plataforma:
 *                 type: string
 *               enlace:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cuenta agregada con éxito
 *       500:
 *         description: Error al agregar la cuenta
 */
router.post('/addUserAccounts', authenticateToken, addUsersAccount);

/**
 * @openapi
 * /user/deleteUserAccounts/{accountId}:
 *   delete:
 *     tags:
 *     - Usuarios
 *     summary: Eliminar cuenta de usuario
 *     description: Elimina una cuenta asociada al usuario autenticado
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la cuenta a eliminar
 *     responses:
 *       200:
 *         description: Cuenta eliminada con éxito
 *       500:
 *         description: Error al eliminar la cuenta
 */
router.delete('/deleteUserAccounts/:accountId', authenticateToken, deleteUserAccounts);

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *     - Usuarios
 *     summary: Registrar un nuevo usuario
 *     description: Registra una nueva cuenta de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               juegoFavorito:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado con éxito
 *       500:
 *         description: Error al registrar el usuario
 */
router.post('/register', createUser);

/**
 * @openapi
 * /user/friendsAccounts/{accountId}:
 *   get:
 *     tags:
 *     - Usuarios
 *     summary: Obtener cuentas de amigos
 *     description: Obtiene las cuentas asociadas a un amigo del usuario autenticado
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del amigo cuyas cuentas se desean obtener
 *     responses:
 *       200:
 *         description: Cuentas del amigo obtenidas con éxito
 *       500:
 *         description: Error al obtener las cuentas del amigo
 */
router.get('/friendsAccounts/:accountId', authenticateToken, getAmigosUsersAccount);

module.exports = router;

export default router;