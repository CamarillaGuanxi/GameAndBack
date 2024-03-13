import { getConnection } from '../database/db';
require('dotenv').config();

const db = getConnection();
const jwt = require('jsonwebtoken');
export const getFavs = async (req, res) => {
    try {
        const { id } = req.user;
        console.log(id + "obo");
        const result = await db.query('SELECT * FROM Favoritos WHERE UsuarioID = ?', [id]);
        res.json(result);
        console.log("bien");
    } catch (err) {
        console.log('Error:');
        res.status(500).json({ error: 'Internal Server Error'  });
    }
};

export const RmFavs = async (req, res) => {
    try {
        const { id } = req.user;
        const { pid } = req.params; // Use req.params for parameters in a DELETE request
        console.log("fdasgasdgasd");
        await db.query('DELETE FROM Favoritos WHERE UsuarioID = ? AND PlantaID = ?', [id, pid]);
        res.status(204).send();  // 204 No Content indicates a successful DELETE
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const AddFavs = async (req, res) => {
    try {
        const { id } = req.user;
        const { pid } = req.body;
        console.log("USer ID " + id);
        await db.query('INSERT INTO Favoritos (UsuarioID, PlantaID) VALUES (?, ?)', [id, pid]);
      
        console.log("HaceElInsert");
        res.status(201).json({ message: 'Inserción exitosa', usuarioId: id, plantaId: pid });
    } catch (err) {
        console.log('Error:', err.message);
        console.log("HaceElInsertERROIR");
    }
};