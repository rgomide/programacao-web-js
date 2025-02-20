const db = require('./db');

const getAll = async () => {
  db.connect();
  const alunos = await db.query('SELECT * FROM aluno');
  db.end();
  return alunos.rows;
};

const getById = async (id) => {
  db.connect();
  const aluno = await db.query('SELECT * FROM aluno WHERE id = $1', [id]);
  db.end();
  return aluno.rows[0];
};

const insert = async (aluno) => {
  db.connect();
  await db.query(
    'INSERT INTO aluno (nome, email, data_nascimento, matricula) VALUES ($1, $2, $3, $4)',
    [aluno.nome, aluno.email, aluno.data_nascimento, aluno.matricula]);
  db.end();
};

const update = async (aluno) => {
  db.connect();
  await db.query(
    'UPDATE aluno SET nome = $1, email = $2, data_nascimento = $3, matricula = $4 WHERE id = $5',
    [aluno.nome, aluno.email, aluno.data_nascimento, aluno.matricula, aluno.id]);
  db.end();
};

const remove = async (id) => {
  db.connect();
  await db.query('DELETE FROM aluno WHERE id = $1', [id]);
  db.end();
};

module.exports = {
  getAll,
  insert,
  update,
  remove
};
