const { query } = require('../db');

const findAll = async () => {
  const users = await query('SELECT * FROM users');
  return users.rows;
};

module.exports = {
  findAll
}