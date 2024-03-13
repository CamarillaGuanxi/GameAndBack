import { getConnection } from '../database/db';

const db = getConnection();

export const getPublicacionesPorForo = async (req, res) => {
    const { foroId } = req.params;
    try {
        const result = await db.query('SELECT * FROM Publicacion WHERE foro_id = ?', foroId);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const crearPublicacion = async (req, res) => {
        const { foroId, titulo, cuerpo, userId } = req.body;
        console.log(req.body);
        try {
            await db.query('INSERT INTO Publicacion (foro_id, titulo, cuerpo, usuario_id) VALUES (?, ?, ?, ?)', [foroId, titulo, cuerpo, userId]);
            res.status(201).json({ message: 'Publicación creada exitosamente' });
        } catch (err) {
            res.status(500).send(err.message);
        }
};

export const crearRespuesta = async (req, res) => {
    const {publicacionId, cuerpo, userId} = req.body;
    try{
        await db.query('INSERT INTO Respuesta (publicacion_id, cuerpo, usuario_id) VALUES (?, ?, ?)', [publicacionId, cuerpo, userId]);
        res.status(201).json({ message: 'Respuesta creada exitosamente' });
    } catch (err){
        res.status(500).send(err.message);
    }
};

export const getPublicacionesPorUsuario = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await db.query('SELECT * FROM Publicacion WHERE usuario_id = ?', userId);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export const getRespuestasPublicacion = async (req, res) => {
    const { publicacionId } = req.params;
    try{
        const result = await db.query('SELECT * FROM Respuesta WHERE publicacion_id = ?', publicacionId);
        res.json(result);
    } catch (err){
        res.status(500).send(err.message);
    }
};

export const getRespuestasUsuario = async (req, res) => {
    const { userId } = req.params;
    try{
        const result = await db.query('SELECT * FROM Respuesta WHERE usuario_id = ?', userId);
        res.json(result);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export const eliminarPublicacion = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Publicacion WHERE id = ?', id);
        res.json({ message: 'Publicación eliminada exitosamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

