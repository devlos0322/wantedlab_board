"use strict";
const mariaDB = require('mariadb');
const config = require('../config/default.json');

let dbPool = mariaDB.createPool({
    host: config.db.host, 
    port: config.db.port, 
    user: config.db.user, 
    password: config.db.password, 
    database: config.db.database, 
    port: config.db.port, 
    connectionLimit: config.db.connectionLimit,
    dateStrings:'date'
});

module.exports = dbPool;