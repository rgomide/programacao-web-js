const { getAll } = require('./alunoModel');

const main = async () => {
  const alunos = await getAll();

  console.log(alunos);
}

main();
