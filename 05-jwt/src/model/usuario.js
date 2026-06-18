const bcrypt = require('bcryptjs');
const { query } = require('../db');

const SALT_ROUNDS = 10;

const findByEmail = async (email) => {
  const result = await query('SELECT * FROM usuario WHERE email = $1', [email]);
  return result.rows[0];
};

const findById = async (id) => {
  const result = await query(
    'SELECT id, nome, email, created_at FROM usuario WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const create = async ({ nome, email, senha }) => {
  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

  const result = await query(
    'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, created_at',
    [nome, email, senhaHash]
  );

  return result.rows[0];
};

module.exports = {
  findByEmail,
  findById,
  create,
};
