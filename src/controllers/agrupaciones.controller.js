import { getConnection } from '../database/db';
require('dotenv').config();

const db = getConnection();
const jwt = require('jsonwebtoken');
export const getAgru = async (req, res) => {
    try {
        const { id } = req.query;
      
        const result = await db.query('SELECT * FROM Agrupaciones WHERE id_usuario = ?', [id]);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error'  });
    }
};

export const RmAgru= async (req, res) => {
    try {
        const {Agrid } = req.params; // Use req.params for parameters in a DELETE request
        console.log("fdasgasdgasd");
        await db.query('DELETE FROM Agrupaciones WHERE id_agrupacione = ?', [Agrid]);
        await db.query('DELETE FROM AgrupacionesPlantas WHERE idAgrupacion = ?', [Agrid]);
        res.status(204).send();  // 204 No Content indicates a successful DELETE
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const AddAgru = async (req, res) => {
    try {
        const { uid, nombre } = req.body;
       
        await db.query('INSERT INTO Agrupaciones (id_usuario, nombre, imagen) VALUES (?, ?, "")', [uid, nombre]);
         console.log("HaceElInsert");
         res.status(201).json({ message: 'Inserción exitosa'});
    } catch (err) {
        console.log('Error:', err.message);
        console.log("HaceElInsertERROIR");
    }
};

export const getAgruPlantada =  async (req, res) => {
    try {
        const { idAgru } = req.query;
        console.log(id + "obo");
        const result = await db.query('SELECT * FROM AgrupacionesPlantas WHERE id_usuario = ? AND nombre = ?', [idAgru]);
        console.log(result);
        res.json(result);
        console.log(res);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error'  });
    }
};

export const AddPlantadaAgru = async (req, res) => {
    try {
        const { idAgru, idPlantada } = req.body;
       
        await db.query('INSERT INTO AgrupacionesPlantas (idAgrupacion, idPlantada) VALUES (?, ?)', [idAgru, idPlantada]);
         console.log("HaceElInsert");
    } catch (err) {
        console.log('Error:', err.message);
        console.log("HaceElInsertERROIR");
    }
};
export const RMPlantadaAgru = async (req, res) => {
    try {
        const {Agrid, plantadaid } = req.params; // Use req.params for parameters in a DELETE request
        console.log("fdasgasdgasd");
        await db.query('DELETE FROM AgrupacionesPlantas WHERE idAgrupacion = ? AND idPlantada = ?', [Agrid, plantadaid]);
        res.status(204).send();  // 204 No Content indicates a successful DELETE
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};