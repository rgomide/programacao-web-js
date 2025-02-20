const { query } = require('./db');

const getAll = async () => {
  const alunos = await query('SELECT * FROM aluno');
  return alunos.rows;
};

const getById = async (id) => {
  const aluno = await query('SELECT * FROM aluno WHERE id = $1', [id]);
  return aluno.rows[0];
};

const insert = async (aluno) => {
  const result = await query(
    'INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ($1, $2, $3, $4) RETURNING *',
    [aluno.nome, aluno.email, aluno.data_nascimento, aluno.matricula]);
  return result.rows[0];
};

const update = async (aluno) => {
  const result = await query(
    'UPDATE aluno SET nome = $1, email = $2, data_nascimento = $3, matricula = $4 WHERE id = $5 RETURNING *',
    [aluno.nome, aluno.email, aluno.data_nascimento, aluno.matricula, aluno.id]);

  return result.rows[0];
};

const remove = async (id) => {
  const result = await query('DELETE FROM aluno WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
};
