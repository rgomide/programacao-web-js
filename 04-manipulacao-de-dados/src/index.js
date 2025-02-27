const { Aluno, Endereco, Curso, Matricula } = require('./model');

async function main() {
  try {
    console.log('=== TESTE DE CRIAÇÃO DE DADOS ===');

    // 1. Criar um novo aluno
    const novoAluno = await Aluno.create({
      nome: 'Roberto Gomide',
      email: 'roberto@email.com',
      data_nascimento: '1990-01-15'
    });

    console.log('\nNovo aluno criado:');
    console.log(JSON.stringify(novoAluno, null, 2));

    // 2. Criar um novo curso
    const novoCurso = await Curso.create({
      nome: 'JavaScript Avançado',
      descricao: 'Curso completo de JavaScript com foco em técnicas avançadas e boas práticas',
      carga_horaria: 60
    });

    console.log('\nNovo curso criado:');
    console.log(JSON.stringify(novoCurso, null, 2));

    // 3. Criar um endereço para o aluno
    const novoEndereco = await Endereco.create({
      id_aluno: novoAluno.id,
      rua: 'Rua das Palmeiras',
      numero: 1000,
      cidade: 'Belo Horizonte',
      estado: 'MG'
    });

    console.log('\nNovo endereço criado:');
    console.log(JSON.stringify(novoEndereco, null, 2));

    // 4. Matricular o aluno no curso
    const novaMatricula = await Matricula.create({
      id_aluno: novoAluno.id,
      id_curso: novoCurso.id,
      data_matricula: new Date().toISOString().split('T')[0] // Data atual em formato YYYY-MM-DD
    });

    console.log('\nNova matrícula criada:');
    console.log(JSON.stringify(novaMatricula, null, 2));

    console.log('\n\n=== EXIBINDO TODOS OS DADOS ===');

    // Buscar e exibir todos os alunos
    const alunos = await Aluno.findAll();

    console.log('\nTodos os alunos:');
    console.log(JSON.stringify(alunos, null, 2));

    // Buscar e exibir todos os cursos
    const cursos = await Curso.findAll();

    console.log('\nTodos os cursos:');
    console.log(JSON.stringify(cursos, null, 2));

    // Buscar e exibir todos os endereços
    const enderecos = await Endereco.findAll();

    console.log('\nTodos os endereços:');
    console.log(JSON.stringify(enderecos, null, 2));

    // Buscar e exibir todas as matrículas
    const matriculas = await Matricula.findAll();

    console.log('\nTodas as matrículas:');
    console.log(JSON.stringify(matriculas, null, 2));

    // Exibir o novo aluno com seu endereço
    const alunoComEndereco = await Aluno.findWithEnderecos(novoAluno.id);

    console.log('\nNovo aluno com seu endereço:');
    console.log(JSON.stringify(alunoComEndereco, null, 2));

    // Exibir o novo curso com seus alunos
    const cursoComAlunos = await Curso.findWithAlunos(novoCurso.id);

    console.log('\nNovo curso com seus alunos:');
    console.log(JSON.stringify(cursoComAlunos, null, 2));

    // 5. Atualizar o aluno
    const alunoAtualizado = await Aluno.update(novoAluno.id, {
      nome: 'Denecley Gomide',
      email: 'denecley@email.com',
      data_nascimento: '1990-01-15'
    });

    console.log('\nAluno atualizado:');
    console.log(JSON.stringify(alunoAtualizado, null, 2));

    // 6. Excluir o aluno
    await Aluno.remove(novoAluno.id);

    console.log('\nAluno excluído:');
    console.log(JSON.stringify(novoAluno, null, 2));
  } catch (error) {
    console.error('Erro ao executar os testes:', error);
  } finally {
    // Importar o db diretamente para poder fechar a conexão
    const db = require('./db');
    await db.destroy();
  }
}

main(); 