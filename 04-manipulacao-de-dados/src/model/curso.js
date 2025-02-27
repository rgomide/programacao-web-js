const db = require('../db');

// Buscar todos os cursos
async function findAll() {
  return db('curso').select('*');
}

// Buscar curso por ID
async function findById(id) {
  return db('curso').where({ id }).first();
}

// Buscar curso com alunos matriculados
async function findWithAlunos(id) {
  const curso = await findById(id);
  if (!curso) return null;
  
  const alunos = await db('aluno')
    .select('aluno.*', 'matricula.data_matricula')
    .join('matricula', 'aluno.id', 'matricula.id_aluno')
    .where('matricula.id_curso', id);
  
  return { ...curso, alunos };
}

// Criar novo curso
async function create(curso) {
  const cursos = await db('curso').insert(curso).returning('id');
  return cursos[0];
}

// Atualizar curso
async function update(id, curso) {
  const cursos = await db('curso').where({ id }).update(curso).returning('*');
  return cursos[0];
}

// Excluir curso
async function remove(id) {
  return db('curso').where('id', id).del();
}

module.exports = {
  findAll,
  findById,
  findWithAlunos,
  create,
  update,
  remove
}; 