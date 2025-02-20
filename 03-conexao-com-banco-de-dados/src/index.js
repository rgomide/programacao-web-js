const { closeConnection } = require('./db');
const { getAll, getById, insert, update, remove } = require('./alunoModel');

const main = async () => {
  const alunos = await getAll();

  console.log('TODOS OSALUNOS');
  console.log(alunos);

  let aluno = {
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    matricula: '1234567890',
    data_nascimento: '1990-01-01'
  };

  aluno = await insert(aluno);

  console.log('ALUNO INSERIDO');
  console.log(aluno);

  aluno = await getById(aluno.id);

  console.log('ALUNO BUSCADO');
  console.log(aluno);

  aluno.nome = 'DENECLEY'
  aluno = await update(aluno);

  console.log('ALUNO ATUALIZADO');
  console.log(aluno);

  aluno = await remove(aluno.id);

  console.log('ALUNO REMOVIDO');
  console.log(aluno);

  await closeConnection();
}

main();
