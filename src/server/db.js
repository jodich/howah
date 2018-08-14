const pg = require('pg');
const configs = {
    user: 'jodich',
    host: '127.0.0.1',
    database: 'howah',
    port: 5432
}

const db = new pg.Pool(configs);

module.exports = db;