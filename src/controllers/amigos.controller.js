import { getConnection } from '../database/db';
require('dotenv').config();
import mssql from 'mssql';

import jwt from 'jsonwebtoken';

export const enviarSolicitud = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const { Solicitado } = req.body;
        const { id } = req.user;
        request.input('Solicitante', mssql.Int, id);
        request.input('Solicitado', mssql.Int, Solicitado);
        const result = await request.execute('enviarSolicitudAmistad');
        const respuesta = result.recordset;
        res.json(respuesta); // Enviar la respuesta con los datos del usuario obtenidos
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const enviarSolicitudNombre = async (req, res) => {
    try {
        const db = await getConnection();
        const request1 = db.request();
        const { Solicitado } = req.body;
        const { id } = req.user;
        request1.input('Solicitado', Solicitado);
        const idSolicitanteResult = await request1.query('SELECT id FROM USUARIO WHERE nombre = @Solicitado');

        const idSolicitado = idSolicitanteResult.recordset[0];

        if (idSolicitado === undefined || idSolicitado === "") {

            return res.json('No se encuentra ese usuario');
        }
        const request = db.request();

        request.input('Solicitante', mssql.Int, id);
        request.input('Solicitado', mssql.Int, idSolicitado.id);
        const result = await request.execute('enviarSolicitudAmistad');
        const respuesta = result.recordset;
        res.json(respuesta);
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message });
    }
};

export const getAmigos = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const { id } = req.user;
        request.input('UserId', mssql.Int, id);
        const result = await request.execute('getAmigos');

        res.json(result.recordset); // Enviar la respuesta con los datos del usuario obtenidos
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const getSolicitudes = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const { id } = req.user;
        request.input('UserId', mssql.Int, id);
        const result = await request.execute('getSolicitudes');



        res.json(result.recordset);
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const aceptarSolicitudes = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const { SolicitudId, Solicitante } = req.body;
        const { id } = req.user;
        request.input('UserId', mssql.Int, id);
        request.input('SolicitudId', mssql.Int, SolicitudId);
        request.input('Solicitante', mssql.Int, Solicitante);

        const result = await request.execute('aceptarSolicitud');
        const respuesta = result.recordset;
        res.json(respuesta); // Enviar la respuesta con los datos del usuario obtenidos
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const rechazarSolicitudes = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const { SolicitudId, Solicitante } = req.body;
        const { id } = req.user;

        request.input('UserId', mssql.Int, id);
        request.input('SolicitudId', mssql.Int, SolicitudId);
        request.input('Solicitante', mssql.Int, Solicitante);

        const result = await request.execute('rechazarSolicitud');
        const respuesta = result.recordset;
        res.json(respuesta); // Enviar la respuesta con los datos del usuario obtenidos
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const eliminarAmigo = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const { Amigo } = req.body;
        const { id } = req.user;
        request.input('UserId', mssql.Int, id);
        request.input('Amigo', mssql.Int, Amigo);

        const result = await request.execute('eliminarAmigo');
        const respuesta = result.recordset;
        res.json(respuesta); // Enviar la respuesta con los datos del usuario obtenidos
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los datos del usuario: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};