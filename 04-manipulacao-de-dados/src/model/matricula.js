const db = require('../db');

// Buscar todas as matrículas
async function findAll() {
  return db('matricula')
    .select(
      'matricula.*',
      'aluno.nome as nome_aluno',
      'curso.nome as nome_curso'
    )
    .join('aluno', 'matricula.id_aluno', 'aluno.id')
    .join('curso', 'matricula.id_curso', 'curso.id');
}

// Buscar matrícula por ID composto (id_aluno e id_curso)
async function findById(idAluno, idCurso) {
  return db('matricula')
    .where({ 
      id_aluno: idAluno, 
      id_curso: idCurso 
    })
    .first();
}

// Buscar matrícula com detalhes do aluno e curso
async function findWithDetails(idAluno, idCurso) {
  const matricula = await findById(idAluno, idCurso);
  if (!matricula) return null;
  
  const aluno = await db('aluno').where('id', idAluno).first();
  const curso = await db('curso').where('id', idCurso).first();
  
  return { ...matricula, aluno, curso };
}

// Buscar matrículas por aluno
async function findByAluno(idAluno) {
  return db('matricula')
    .select(
      'matricula.*',
      'curso.nome as nome_curso',
      'curso.descricao as descricao_curso',
      'curso.carga_horaria as carga_horaria_curso'
    )
    .where('matricula.id_aluno', idAluno)
    .join('curso', 'matricula.id_curso', 'curso.id');
}

// Buscar matrículas por curso
async function findByCurso(idCurso) {
  return db('matricula')
    .select(
      'matricula.*',
      'aluno.nome as nome_aluno',
      'aluno.email as email_aluno'
    )
    .where('matricula.id_curso', idCurso)
    .join('aluno', 'matricula.id_aluno', 'aluno.id');
}

// Criar nova matrícula
async function create(matricula) {
  await db('matricula').insert(matricula);
  return findById(matricula.id_aluno, matricula.id_curso);
}

// Atualizar matrícula (apenas a data de matrícula pode ser atualizada)
async function update(idAluno, idCurso, data) {
  await db('matricula')
    .where({ 
      id_aluno: idAluno, 
      id_curso: idCurso 
    })
    .update({ data_matricula: data.data_matricula });
  
  return findById(idAluno, idCurso);
}

// Excluir matrícula
async function remove(idAluno, idCurso) {
  return db('matricula')
    .where({ 
      id_aluno: idAluno, 
      id_curso: idCurso 
    })
    .del();
}

module.exports = {
  findAll,
  findById,
  findWithDetails,
  findByAluno,
  findByCurso,
  create,
  update,
  remove
}; 