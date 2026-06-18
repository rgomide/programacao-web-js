const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./middleware/auth');
const usuarioModel = require('./model/usuario');
const alunoModel = require('./model/aluno');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de autenticação com JWT',
    rotasPublicas: ['POST /auth/register', 'POST /auth/login'],
    rotasProtegidas: ['GET /auth/me', 'GET /alunos', 'GET /alunos/:id'],
  });
});

app.post('/auth/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Informe nome, email e senha' });
  }

  const usuarioExistente = await usuarioModel.findByEmail(email);

  if (usuarioExistente) {
    return res.status(409).json({ erro: 'Email já cadastrado' });
  }

  const usuario = await usuarioModel.create({ nome, email, senha });

  return res.status(201).json(usuario);
});

app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe email e senha' });
  }

  const usuario = await usuarioModel.findByEmail(email);

  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  return res.json({ token });
});

app.get('/auth/me', authMiddleware, async (req, res) => {
  const usuario = await usuarioModel.findById(req.usuario.id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  return res.json(usuario);
});

app.get('/alunos', authMiddleware, async (req, res) => {
  const alunos = await alunoModel.getAll();
  return res.json(alunos);
});

app.get('/alunos/:id', authMiddleware, async (req, res) => {
  const aluno = await alunoModel.getById(req.params.id);

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  return res.json(aluno);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
