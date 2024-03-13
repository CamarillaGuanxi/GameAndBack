import { config } from 'dotenv';

config();

export default {
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_passwd: process.env.DB_PASSWD,
    db_port: process.env.DB_PORT,
    jwt_secret: process.env.JWT_PASSWD,
    jwt_expires: process.env.JWT_EXPIRES,
    connectTimeout: 30000
};