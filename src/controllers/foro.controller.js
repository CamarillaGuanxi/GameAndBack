import { getConnection } from '../database/db';

const db = getConnection();

export const getForos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Foro');
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
};

export const getForoById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM Foro WHERE id = ?', [id]);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


