# Express.js: configuração e estrutura de projetos

## Sumário

## Introdução

O Express é um framework para criar servidores HTTP em Node.js. Ele é muito popular por ser extremamente simples e flexível, além de possuir uma grande comunidade de desenvolvedores.

## Estrutura de projeto
 
 Nesse projeto, vamos criar uma API para gerenciar a tabela `aluno`. A API tem as seguintes funcionalidades:

- Listar todos os alunos
- Buscar um aluno pelo ID
- Criar um novo aluno
- Atualizar um aluno pelo ID
- Deletar um aluno pelo ID

## O framework Express

Neste projeto, o framework Express foi utilizado para configurar o servidor HTTP e definir as rotas para as funcionalidades da API. O arquivo [index.js](./src/index.js) é o ponto de entrada da aplicação.

Nesse arquivo, foram configuradas as seguintes funcionalidades:

### Configuração do servidor HTTP

O servidor HTTP é configurado com o comando `app.listen(3000, () => { ... })`. Esse comando faz o servidor escutar na porta 3000 e, quando a porta estiver disponível, exibirá uma mensagem no console.

```javascript
const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});
```

### Definição das rotas para as funcionalidades da API

As rotas para as funcionalidades da API são definidas com os métodos `app.get()`, `app.post()`, `app.put()` e `app.delete()`. Cada método recebe uma rota e uma função de callback que será executada quando a rota for acessada.

Exemplo de rota para listar todos os alunos:
```javascript
app.get('/alunos', async (req, res) => {
  const alunos = await alunoModel.getAll();
  res.json(alunos);
});
```

### Configuração do middleware para converter o corpo das requisições como JSON

O middleware para converter o corpo das requisições como JSON é configurado com o comando `app.use(express.json())`. Esse comando faz o servidor converter o corpo das requisições como JSON.

```javascript
app.use(express.json());
```

## Rotas da aplicação

A partir da configuração do servidor HTTP e das rotas para as funcionalidades da API, é possível testar a aplicação. Para testar a aplicação, podemos utilizar o comando `npm run dev` para iniciar o servidor e algum client HTTP como o [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) para testar as rotas.

As rotas da aplicação são:

- `GET /alunos`: Lista todos os alunos.
- `GET /alunos/:id`: Busca um aluno pelo ID.
- `POST /alunos`: Cria um novo aluno.
- `PUT /alunos/:id`: Atualiza um aluno pelo ID.
- `DELETE /alunos/:id`: Deleta um aluno pelo ID.

### Extraindo parâmetros da URL (Path Parameters ou Parâmetros de caminho)

Os parâmetros de caminho são extraídos da URL com o método `req.params`.

Exemplo:

```javascript
app.get('/alunos/:id', async (req, res) => {
  const id = req.params.id; // Extrai o parâmetro id da URL
  const aluno = await alunoModel.getById(id); // Busca o aluno pelo ID
  res.json(aluno); // Retorna o aluno encontrado
});
```

### Extraindo parâmetros do corpo da requisição (Body Parameters ou Parâmetros do corpo)

Os parâmetros do corpo são extraídos do corpo da requisição com o método `req.body`.

Exemplo:

```javascript
app.post('/alunos', async (req, res) => {
  const aluno = req.body; // Extrai o corpo da requisição
  const novoAluno = await alunoModel.create(aluno); // Cria um novo aluno
  res.json(novoAluno); // Retorna o aluno criado
});
```

## Demonstração da extensão Thunder Client

A extensão Thunder Client é uma ferramenta poderosa para testar APIs. Ela permite testar as rotas da aplicação com facilidade e rapidez. O vídeo abaixo demonstra como utilizar a extensão para testar as rotas da aplicação.

[![Demonstração da extensão Thunder Client](https://img.youtube.com/vi/Ba6VEv1BvNI/0.jpg)](https://www.youtube.com/watch?v=Ba6VEv1BvNI)

## Referências

- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Thunder Client](https://www.thunderclient.com/)