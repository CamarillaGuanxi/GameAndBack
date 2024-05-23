import { getConnection } from '../database/db';
require('dotenv').config();
import mssql from 'mssql';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await getConnection();
    const result = await db.request()
      .input('email', mssql.NVarChar(255), email)
      .query('SELECT id, contraseña FROM USUARIO WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const usuario = result.recordset[0];

    // Comparar la contraseña ingresada con el hash almacenado
    const validPassword = await bcrypt.compare(password, usuario.contraseña);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token de acceso con solo el ID del usuario
    const accessToken = jwt.sign({ id: usuario.id }, process.env.ACCESS_TOKEN_SECRET);

    res.json({ id: usuario.id, accessToken });
  } catch (error) {
    console.error('Error al autenticar usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getUserData = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const { id } = req.user;
    request.input('UserId', mssql.Int, id);
    const result = await request.execute('getUserData');

    res.json(result.recordset[0]); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }
};

export const getUsersAccount = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const { id } = req.user;
    request.input('UserId', mssql.Int, id);
    const result = await request.execute('getAccounts');
    res.json(result.recordset); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }
};
export const getAmigosUsersAccount = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const { accountId } = req.params; // Obtén accountId directamente de req.params
    request.input('UserId', mssql.Int, accountId);
    const result = await request.execute('getAccounts');
    res.json(result.recordset); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }

};

export const addUsersAccount = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const { nombreCuenta, plataforma, enlace } = req.body;
    const { id } = req.user;
    request.input('UserID', mssql.Int, id);
    request.input('PlatformName', mssql.NVarChar(50), plataforma);
    request.input('ProfileLink', mssql.NVarChar(255), enlace);
    request.input('NombreUsuario', mssql.NVarChar(255), nombreCuenta);
    request.output('Respuesta', mssql.NVarChar(mssql.MAX));
    const result = await request.execute('addAccounts');
    const respuesta = result.output.Respuesta;
    res.json(respuesta);
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message });
  }
};

export const deleteUserAccounts = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const accountId = req.params.accountId; // Suponiendo que el ID del juego se obtiene de los parámetros de la solicitud
    request.input('ID', mssql.Int, accountId);
    const result = await request.execute('DeleteAccountByID');
    const respuesta = result.recordset; // Acceder a la respuesta desde el objeto result
    console.log(respuesta);
    res.json(respuesta); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }
};
export const updateUserData = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const { nombre, email, contraseña, juegoFavorito } = req.body;
    const { id } = req.user;

    request.input('UserID', mssql.Int, id);
    request.input('NewName', mssql.NVarChar(50), nombre);
    request.input('NewPassword', mssql.NVarChar(50), contraseña);
    request.input('NewGameFavorite', mssql.NVarChar(50), juegoFavorito);
    request.input('NewEmail', mssql.NVarChar(100), email);
    const result = await request.execute('editUser');
    const respuesta = result.recordset;; // Acceder a la respuesta desde el objeto result
    res.json(respuesta); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }
};
export const createUser = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const { nombre, email, contraseña, juegoFavorito } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    request.input('nombre_usuario', mssql.NVarChar(255), nombre);
    request.input('correo_electronico', mssql.NVarChar(255), email);
    request.input('contrasena', mssql.NVarChar(255), hashedPassword);
    request.input('juegoFavorito', mssql.NVarChar(255), juegoFavorito);
    request.output('repetido', mssql.NVarChar(50));

    const result = await request.execute('crearCuenta');
    const respuesta = result.output.repetido; // Acceder a la respuesta desde el objeto result
    console.log(respuesta);
    res.json(respuesta); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }
};
