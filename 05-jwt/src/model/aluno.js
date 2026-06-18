const { query } = require('../db');

const getAll = async () => {
  const alunos = await query('SELECT * FROM aluno ORDER BY id');
  return alunos.rows;
};

const getById = async (id) => {
  const aluno = await query('SELECT * FROM aluno WHERE id = $1', [id]);
  return aluno.rows[0];
};

module.exports = {
  getAll,
  getById,
};
