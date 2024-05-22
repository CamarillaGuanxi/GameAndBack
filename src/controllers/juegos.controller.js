import { getConnection } from '../database/db';
import mssql from 'mssql'; // Importa el módulo mssql



export const getJuegos = async (req, res) => {
    try {
        const db = await getConnection();
        const result = await db.request().execute('getJuegos');
        const juegos = result.recordset.map(juego => ({
            id: juego.id,
            nombre: juego.nombre
        }));
        res.json(juegos);
    } catch (error) {
        console.error('Error al obtener los juegos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};