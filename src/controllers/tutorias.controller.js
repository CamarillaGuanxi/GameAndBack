import { getConnection } from '../database/db';
require('dotenv').config();
import mssql from 'mssql';

import jwt from 'jsonwebtoken';

export const getTutorias = async (req, res) => {
  try {
    const { id } = req.user;
    const db = await getConnection();
    const request = db.request();
    request.input('UserId', mssql.Int, id);
    const result = await request.execute('getTutorias');

    res.json(result.recordset); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }

};

export const getMisClases = async (req, res) => {
  try {
    const { id } = req.user;
    const db = await getConnection();
    const request = db.request();
    request.input('UserId', mssql.Int, id);
    const result = await request.execute('getMisClases');

    res.json(result.recordset); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }

};

export const deleteTutorias = async (req, res) => {
  try {
    const { idTutoria } = req.params;
    const db = await getConnection();
    const request = db.request();
    request.input('idTutoria', mssql.Int, idTutoria);
    const result = await request.execute('deleteTutoria');
    res.json(result.recordset[0]);
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message });
  }

};

export const desmatricularse = async (req, res) => {
  try {
    const { idclase } = req.params;
    const db = await getConnection();
    const request = db.request();
    request.input('clase', mssql.Int, idclase);
    const result = await request.execute('desmatricularseClase');
    res.json(result.recordset[0]);
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message });
  }

};

export const crearClase = async (req, res) => {
  try {
    const { tutoria } = req.params;
    const { id } = req.user;
    const db = await getConnection();
    const request = db.request();
    request.input('tutoria', mssql.Int, tutoria);
    request.input('alumno', mssql.Int, id);
    const result = await request.execute('crearClase');
    res.json(result.recordset[0]);
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message });
  }

};

export const creatTutoria = async (req, res) => {
  try {
    const db = await getConnection();
    const { precio, servidor, idioma, nombre, descripcion, idJuego, etiquetas, plataforma } = req.body;
    const { id } = req.user;
    const request = db.request();
    request.input('precio', mssql.Int, precio);
    request.input('servidor', mssql.VarChar(255), servidor);
    request.input('idioma', mssql.VarChar(255), idioma);
    request.input('AlumnosActuales', mssql.Int, 0);
    request.input('nombre', mssql.VarChar(255), nombre);
    request.input('descripcion', mssql.VarChar(255), descripcion);
    request.input('id_juego', mssql.Int, idJuego);
    request.input('profesor', mssql.Int, id);
    request.input('plataforma', mssql.VarChar(100), plataforma);


    const result = await request.execute('crearTutoria');

    // Obtener el ID de la sala creado a partir del parámetro de salida
    const nuevaSala = result.recordset;

    if (etiquetas && etiquetas.length > 0) {
      const ids = etiquetas.map(item => item.id).join(',');
      const etiquetasRequest = db.request();
      etiquetasRequest.input('etiquetas', mssql.VarChar(255), ids);
      etiquetasRequest.input('idtutoria', mssql.Int, nuevaSala[0].id);
      await etiquetasRequest.execute('agregarEtiquetasTutorias');
    }


    res.json(nuevaSala[0]);
  } catch (error) {
    throw new Error('Error al crear la sala: ' + error.message);
  }
};

export const getAllEtiquetasTutorias = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const result = await request.execute('etiquetasTutorias');
    const etiquetas = result.recordset;

    res.json(etiquetas); // Enviar la respuesta con las etiquetas obtenidas
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las etiquetas: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }
};

export const getAllCategoriasTutorias = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();

    const idJuego = req.params.idJuego; // Suponiendo que el ID del juego se obtiene de los parámetros de la solicitud

    request.input('idJuego', mssql.Int, idJuego);

    const result = await request.query('EXEC categoriasTutorias');
    const etiquetas = result.recordset;

    res.json(etiquetas); // Enviar la respuesta con las etiquetas obtenidas
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las etiquetas: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }
};

export const tutoriasImpartidas = async (req, res) => {
  try {
    const { id } = req.user;
    const db = await getConnection();
    const request = db.request();
    request.input('UserId', mssql.Int, id);
    const result = await request.execute('tutoriasImpartidas');

    res.json(result.recordset); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }

};


export const getParticipantesClase = async (req, res) => {
  try {
    const { idclase } = req.params;
    const db = await getConnection();
    const request = db.request();
    request.input('ClaseId', mssql.Int, idclase);
    const result = await request.execute('getParticipantesClase');

    res.json(result.recordset); // Enviar la respuesta con los datos del usuario obtenidos
  } catch (error) {

    res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
  }

};