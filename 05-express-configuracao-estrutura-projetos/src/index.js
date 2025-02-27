const express = require('express');
const app = express();
const alunoModel = require('./model/alunoModel');

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Rota para listar todos os alunos
app.get('/alunos', async (req, res) => {
  const alunos = await alunoModel.getAll();
  res.json(alunos);
});

// Rota para buscar um aluno pelo ID
app.get('/alunos/:id', async (req, res) => {
  const aluno = await alunoModel.getById(req.params.id);
  res.json(aluno);
});

// Rota para criar um novo aluno
app.post('/alunos', async (req, res) => {
  let aluno = req.body;

  aluno = await alunoModel.insert(req.body);

  res.json(aluno);
});

// Rota para atualizar um aluno pelo ID
app.put('/alunos/:id', async (req, res) => {
  let aluno = req.body;
  aluno.id = req.params.id;

  const alunoAtualizado = await alunoModel.update(aluno);

  res.json(alunoAtualizado);
});

// Rota para deletar um aluno pelo ID
app.delete('/alunos/:id', async (req, res) => {
  const aluno = await alunoModel.remove(req.params.id);
  res.json(aluno);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});
