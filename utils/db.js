const mysql = require('mysql');
const util = require('util');
const CONFIG = require('./config')

const connection = mysql.createConnection({
    host: CONFIG.DB.HOST,
    user: CONFIG.DB.USER,
    password: CONFIG.DB.PASSWORD,
    database: CONFIG.DB.SCHEMA
});

const init = () => {
    connection.connect()
}

const query = util.promisify(connection.query).bind(connection);

module.exports = {
    connection,
    query,
    init
}