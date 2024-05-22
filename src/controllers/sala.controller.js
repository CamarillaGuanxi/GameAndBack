import { getConnection } from '../database/db';
import mssql from 'mssql';


export const crearSala = async (req, res) => {
    try {
        const db = await getConnection();
        const { tipoPartida, servidor, idioma, numeroJugadores, nombre, descripcion, idJuego, etiquetas, plataforma } = req.body;
        const { id } = req.user;
        const request = db.request();
        request.input('tipo_partida', mssql.VarChar(255), tipoPartida);
        request.input('servidor', mssql.VarChar(255), servidor);
        request.input('idioma', mssql.VarChar(255), idioma);
        request.input('numero_jugadores', mssql.Int, numeroJugadores);
        request.input('nombre', mssql.VarChar(255), nombre);
        request.input('descripcion', mssql.VarChar(255), descripcion);
        request.input('id_juego', mssql.Int, idJuego);
        request.input('lider', mssql.Int, id);
        request.input('plataforma', mssql.VarChar(100), plataforma);

        // Agregar parámetro de salida para el ID de la sala

        const result = await request.execute('crearSala');

        // Obtener el ID de la sala creado a partir del parámetro de salida
        const nuevaSala = result.recordset;
        if (etiquetas && etiquetas.length > 0) {
            const ids = etiquetas.map(item => item.id).join(',');
            const etiquetasRequest = db.request();
            etiquetasRequest.input('etiquetas', mssql.VarChar(255), ids);
            etiquetasRequest.input('id_sala', mssql.Int, nuevaSala[0].id);
            await etiquetasRequest.execute('agregarEtiqueta');
        }


        res.json(nuevaSala[0]);
    } catch (error) {
        throw new Error('Error al crear la sala: ' + error.message);
    }
};

export const getAllSalas = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const idJuego = req.params.idJuego; // Suponiendo que el ID del juego se obtiene de los parámetros de la solicitud
        request.input('id_juego', mssql.Int, idJuego);

        const result = await request.execute('getAllSalas');

        const salas = result.recordset;

        res.json(salas); // Enviar la respuesta con las salas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las salas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const getAllEtiquetas = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const idJuego = req.params.idJuego; // Suponiendo que el ID del juego se obtiene de los parámetros de la solicitud
        request.input('idJuego', mssql.Int, idJuego);

        const result = await request.query('EXEC getAllEtiquetas @idJuego', { idJuego: idJuego });
        const etiquetas = result.recordset;

        res.json(etiquetas); // Enviar la respuesta con las etiquetas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las etiquetas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const getAllCategorias = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();

        const idJuego = req.params.idJuego; // Suponiendo que el ID del juego se obtiene de los parámetros de la solicitud

        request.input('idJuego', mssql.Int, idJuego);

        const result = await request.query('EXEC getAllCategorias @idJuego', { idJuego: idJuego });
        const etiquetas = result.recordset;

        res.json(etiquetas); // Enviar la respuesta con las etiquetas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las etiquetas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const getAllTipoPartidas = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();

        const idJuego = req.params.idJuego;
        // Suponiendo que el ID del juego se obtiene de los parámetros de la solicitud
        request.input('idJuego', mssql.Int, idJuego);


        const result = await request.query('EXEC TipoPartidaPorJuego @idJuego', { idJuego: idJuego });
        const TipoPartida = result.recordset;
        res.json(TipoPartida); // Enviar la respuesta con las etiquetas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las etiquetas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }

}
export const getUsersFromSala = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const idSala = req.params.idSala;
        request.input('RoomID', mssql.Int, idSala);

        const result = await request.execute('getUsuariosEnSala');

        const usuarios = result.recordset;
        res.json(usuarios); // Enviar la respuesta con las salas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las salas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const deleteUserFromSala = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const idSala = req.params.idSala;

        const { id } = req.user;
        request.input('RoomID', mssql.Int, idSala);
        request.input('UserID', mssql.Int, id)
        const result = await request.execute('EliminarUsuarioDeSala');




        res.json(result); // Enviar la respuesta con las salas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las salas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const addUserInSala = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const { idSala } = req.body;
        const { id } = req.user;

        request.input('RoomID', mssql.Int, idSala);
        request.input('UserID', mssql.Int, id)
        const result = await request.execute('InsertarUsuarioEnSala');

        const usuarios = result.recordset;

        res.json(usuarios); // Enviar la respuesta con las salas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las salas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};


export const getSalaFromUser = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const idUsuario = req.params.idUsuario; // Acceder al valor específico del parámetro idUsuario

        request.input('UserId', mssql.Int, idUsuario);

        const result = await request.execute('obtenerSaladeUsuario');

        const usuarios = result.recordset;

        res.json(usuarios); // Enviar la respuesta con las salas obtenidas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las salas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};
export const deleteSala = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const idSala = req.params.idSala;
        request.input('idSala', mssql.Int, idSala);

        const result = await request.execute('deleteSala');

        const usuarios = result.recordset;
        res.json(usuarios); // Enviar la respuesta con las salas obtenidas
    } catch (error) {
        console.error("Error al eliminar la sala:", error);
        res.status(500).json({ error: 'Error al obtener las salas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};

export const cambiarLider = async (req, res) => {
    try {
        const db = await getConnection();
        const request = db.request();
        const idSala = req.params.idSala;
        const idUsuario = req.params.idUsuario;
        request.input('userId', mssql.Int, idUsuario);
        request.input('salaId', mssql.Int, idSala);

        const result = await request.execute('cambiarLiderSala');

        const usuarios = result.recordset;
        res.json(usuarios); // Enviar la respuesta con las salas obtenidas
    } catch (error) {
        console.error("Error al cambiar el lider de la sala:", error);
        res.status(500).json({ error: 'Error al obtener las salas: ' + error.message }); // Manejar el error y enviar una respuesta de error
    }
};