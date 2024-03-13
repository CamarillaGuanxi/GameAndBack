import { getConnection } from '../database/db';

const db = getConnection();

export const getPlantas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Planta');
        res.json(result);
    } catch(err) { res.status(500); }
};

export const getGuias = async (req, res) => {
    const { id } = req.params;
    try {
        console.log('Ha entrado en la consulta de guia');
        const result = await db.query('SELECT * FROM Guia_de_plantado WHERE planta_id = ?', id);
        res.json(result);
        console.log('Ha acabado la consulta');
    } catch(err) { res.status(500); }
};

export const getPlantadas = async (req, res) => {
    const userId = req.query.userId;
    
    console.log('Empieza la consulta de plantadas'     +     userId)
    try {
        const result = await db.query(`SELECT 
                                            Plantada.*,
                                            Planta.nombre,
                                            Planta.descripcion,
                                            Planta.dificultad_plantado,
                                            Planta.tipo,
                                            Planta.estacion_recomendada,
                                            Planta.funcionalidad_planta,
                                            Planta.categoria_id,
                                            Planta.imagen,
                                            Guia_de_plantado.periodicidad_regado,
                                            Guia_de_plantado.condiciones_luminosas,
                                            Guia_de_plantado.condiciones_temperatura,
                                            Guia_de_plantado.inicio_periodo,
                                            Guia_de_plantado.fin_periodo,
                                            Guia_de_plantado.tam_maceta
                                        FROM Plantada
                                        INNER JOIN Planta ON Plantada.planta_id = Planta.id
                                        INNER JOIN Guia_de_plantado ON Planta.id = Guia_de_plantado.planta_id
                                        WHERE Plantada.usuario_id = ?;
    
    `, userId);

        res.json(result);
        console.log('Consulta plantadas completa')
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getPasos = async (req, res) => {
    const id = req.query.id;
    try {
        console.log('Empieza la consulta de pasos            ' + id)
        const result = await db.query(`SELECT * FROM Pasos_de_Plantado
                                        WHERE planta_id = ?;`, id);
        res.json(result);
        console.log('Consulta asos completa ' + result)
    } catch (err) { res.status(500); }
};

export const nextStep = async (req, res) => {
    const {plantadaId} = req.params;
    console.log('entra en siguiente paso           ' + plantadaId)
    try {
        const result = await db.query(`UPDATE Plantada
                                        SET paso = paso + 1
                                        WHERE id = ?;`, plantadaId);

        if (result.affectedRows != 1) { throw { CODE: 403 }; }
        res.json({plantadaId, updated: true});
    } catch(err) {
        res.status(err.CODE || 500)
            .json({updated: false});
    }
};

export const delPlantada = async (req, res) => {
    let { plantadaId } = req.params;

    try {
        const result = await db.query('DELETE FROM Plantada WHERE id = ?', plantadaId);
        console.log('sa borrao')
        if (result.affectedRows != 1) { throw { CODE: 403 }; }
        res.json({id, deleted: true});
    } catch(err) {
        res.status(err.CODE || 500)
            .json({deleted: false});
    }
};

export const regar = async (req, res) => {
    const {plantadaId} = req.params;
    console.log('se riega          ' + plantadaId)
    try {
        const result = await db.query(`UPDATE Plantada
                                        SET regada = 1
                                        WHERE id = ?;`, plantadaId);

        if (result.affectedRows != 1) { throw { CODE: 403 }; }
        res.json({plantadaId, updated: true});
    } catch(err) {
        res.status(err.CODE || 500)
            .json({updated: false});
    }
};

export const addPlantada = async (req, res) => {
    try {
        const { uid, pid } = req.body;
       
        await db.query(`INSERT INTO Plantada (usuario_id, planta_id, paso, regada, fechaPlantada, ultimoRiego)
                        VALUES (?, ?, 1, 0, NOW(), NULL);`, [uid, pid]);
        console.log(uid);
        console.log("HaceElInsert");
        res.status(201).json({ message: 'Inserción exitosa', usuarioId: uid, plantaId: pid });
    } catch (err) {
        console.log('Error:', err.message);
        console.log("HaceElInsertERROR");
        res.status(500).json({ message: 'Error al insertar plantada' });
    }
};