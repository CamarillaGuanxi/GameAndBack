import mysql from 'mysql2';
import util from 'util';
import config from '../config';

const connection = mysql.createConnection({
    host: config.db_host,
    database: config.db_name,
    user: config.db_user,
    password: config.db_passwd,
    port: config.db_port,
    connectTimeout: 30000
});

export const getConnection = () => {
    return {
        query(sql, args) {
          return util.promisify(connection.query)
            .call(connection, sql, args);
        },
        close() {
          return util.promisify(connection.end)
            .call(connection);
        }
    };
};