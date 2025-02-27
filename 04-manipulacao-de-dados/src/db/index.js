const knex = require('knex');

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10
  },
};

// Inicializa a conexão com o banco de dados
const db = knex(config);

module.exports = db; 