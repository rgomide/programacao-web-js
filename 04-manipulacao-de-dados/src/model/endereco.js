const db = require('../db');

// Buscar todos os endereços
async function findAll() {
  return db('endereco').select('*');
}

// Buscar endereço por ID
async function findById(id) {
  return db('endereco').where({ id }).first();
}

// Buscar endereços por aluno
async function findByAluno(idAluno) {
  return db('endereco').where('id_aluno', idAluno);
}

// Criar novo endereço
async function create(endereco) {
  const enderecos = await db('endereco').insert(endereco).returning('*');
  return enderecos[0];
}

// Atualizar endereço
async function update(id, endereco) {
  const enderecos = await db('endereco').where({ id }).update(endereco).returning('*');
  return enderecos[0];
}

// Excluir endereço
async function remove(id) {
  return db('endereco').where('id', id).del();
}

module.exports = {
  findAll,
  findById,
  findByAluno,
  create,
  update,
  remove
}; 