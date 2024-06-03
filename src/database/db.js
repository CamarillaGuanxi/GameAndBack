import sql from 'mssql';
import { config } from 'dotenv';
const axios = require('axios');
const msRestNodeAuth = require('@azure/ms-rest-nodeauth');
config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }, // Asegúrate de parsear el puerto a un número entero
    options: {
        encrypt: true, // Importante si estás utilizando Azure SQL Database
        trustServerCertificate: false
    }
};

let pool;

(async () => {
    const response = await axios.get('https://api.ipify.org?format=json');

    console.log('IP ' + response.data.ip);

    try {
        pool = await sql.connect(dbConfig);
        console.log('Conexión exitosa a la base de datos.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
})();

export const getConnection = async () => {
    try {
        // Verifica si la conexión está establecida antes de devolverla
        if (!pool) {
            pool = await sql.connect(dbConfig);
        }
        return pool;
    } catch (error) {
        console.error('Error al obtener la conexión:', error.message);
        throw error;
    }
};