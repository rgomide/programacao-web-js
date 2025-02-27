const db = require('../db');

// Buscar todos os alunos
async function findAll() {
  return db('aluno').select('*');
}

// Buscar aluno por ID
async function findById(id) {
  return db('aluno').where('id', id).first();
}

// Buscar aluno com seus endereços
async function findWithEnderecos(id) {
  const aluno = await findById(id);
  if (!aluno) return null;
  
  const enderecos = await db('endereco').where('id_aluno', id);
  return { ...aluno, enderecos };
}

// Criar novo aluno
async function create(aluno) {
  const alunos = await db('aluno').insert(aluno).returning('*');
  return alunos[0];
}

// Atualizar aluno
async function update(id, aluno) {
  const alunos = await db('aluno').where({ id }).update(aluno).returning('*');
  return alunos[0];
}

// Excluir aluno
async function remove(id) {
  return db('aluno').where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  findWithEnderecos,
  create,
  update,
  remove
}; 