# Express.js: configuração e estrutura de projetos

## Sumário

- [Introdução](#introdução)
- [Estrutura de projeto](#estrutura-de-projeto)
- [O framework Express](#o-framework-express)
  - [Configuração do servidor HTTP](#configuração-do-servidor-http)
  - [Definição das rotas para as funcionalidades da API](#definição-das-rotas-para-as-funcionalidades-da-api)
  - [Configuração do middleware para converter o corpo das requisições como JSON](#configuração-do-middleware-para-converter-o-corpo-das-requisições-como-json)
- [Rotas da aplicação](#rotas-da-aplicação)
  - [Extraindo parâmetros da URL (Path Parameters ou Parâmetros de caminho)](#extraindo-parâmetros-da-url-path-parameters-ou-parâmetros-de-caminho)
  - [Extraindo parâmetros do corpo da requisição (Body Parameters ou Parâmetros do corpo)](#extraindo-parâmetros-do-corpo-da-requisição-body-parameters-ou-parâmetros-do-corpo)
  - [Extraindo parâmetros da query string (Query Parameters ou Parâmetros de consulta)](#extraindo-parâmetros-da-query-string-query-parameters-ou-parâmetros-de-consulta)
  - [O objeto response](#o-objeto-response)
- [Demonstração da extensão Thunder Client](#demonstração-da-extensão-thunder-client)
- [Exercícios](#exercícios)

## Introdução

O Express é um framework para criar servidores HTTP em Node.js. Ele é muito popular por ser extremamente simples e flexível, além de possuir uma grande comunidade de desenvolvedores.

## Estrutura de projeto
 
 Nesse projeto, vamos criar uma API para gerenciar a tabela `aluno`. Do inglês API significa Application Programming Interface (Interface de Programação de Aplicações). As APIs possuem a finalidade de permitir que diferentes softwares se comuniquem entre si.

 A API deste projeto tem as seguintes funcionalidades:

- Listar todos os alunos
- Buscar um aluno pelo ID
- Criar um novo aluno
- Atualizar um aluno pelo ID
- Deletar um aluno pelo ID

## O framework Express

Neste projeto, o framework Express foi utilizado para configurar o servidor HTTP e definir as rotas para as funcionalidades da API. O arquivo [src/index.js](./src/index.js) é o ponto de entrada da aplicação.

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

- `GET /`: Retorna uma mensagem de boas vindas.
- `GET /hello`: Retorna uma mensagem de Hello World.
- `GET /alunos`: Lista todos os alunos.
- `GET /alunos/:id`: Busca um aluno pelo ID.
- `POST /alunos`: Cria um novo aluno.
- `PUT /alunos/:id`: Atualiza um aluno pelo ID.
- `DELETE /alunos/:id`: Deleta um aluno pelo ID.

### O objeto request (req)

O objeto request (req) é o objeto que é passado para a função de callback de uma rota. Ele possui métodos e propriedades para acessar os dados da requisição.

Exemplo:

```javascript
app.get('/alunos/:id', async (req, res) => {
  const id = req.params.id; // Extrai o parâmetro id da URL
  const aluno = await alunoModel.getById(id); // Busca o aluno pelo ID
  res.json(aluno); // Retorna o aluno encontrado
});
```

Existem outros métodos e propriedades que podem ser utilizados para acessar os dados da requisição. As próximas seções irão demonstrar como utilizar os principais métodos e propriedades do objeto request.

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

### Extraindo parâmetros da query string (Query Parameters ou Parâmetros de consulta)

Os parâmetros de consulta são extraídos da query string com o método `req.query`.

Exemplo com a rota de busca de alunos:

```bash
GET http://localhost:3000/alunos?nome=João&sobrenome=da Silva
```

```javascript
app.get('/hello', (req, res) => {
  let nome = '';

  if (req.query.nome) {
    nome = req.query.nome;
  }

  res.send(`Hello World ${nome}`);
});
```

### O objeto response (res)

O objeto response é o objeto que é retornado pela função de callback de uma rota. Ele possui métodos para enviar a resposta para o cliente.

Exemplo:

```javascript
res.json({ message: 'Hello World' }); // Envia uma resposta JSON para o cliente

// ...

res.send('Hello World'); // Envia uma resposta de texto para o cliente

// ...

res.status(201).json({ message: 'Aluno criado com sucesso' }); // Envia uma resposta JSON com status 201 para o cliente
```

## Demonstração da extensão Thunder Client

A extensão Thunder Client é uma ferramenta poderosa para testar APIs. Ela permite testar as rotas da aplicação com facilidade e rapidez. O vídeo abaixo demonstra como utilizar a extensão para testar as rotas da aplicação.

[![Demonstração da extensão Thunder Client](https://img.youtube.com/vi/Ba6VEv1BvNI/0.jpg)](https://www.youtube.com/watch?v=Ba6VEv1BvNI)

## Exercícios

### Exercício 1 - Criar uma rota para as operações aritméticas

Crie rotas para as operações aritméticas de soma, subtração, multiplicação e divisão. As rotas devem receber três parâmetros: dois números e a operação matemática. As rotas devem retornar o resultado da operação.

Exemplo de rota para a operação de soma:

```bash
GET http://localhost:3000/operacoes/somar/10/20
```

Resposta:

```json
{ "resultado": 30 }
```

### Exercício 2 - Criar uma rota que recebe um objeto JSON e retorna o nome completo do usuário

Crie uma rota que recebe um objeto JSON com os atributos `nome` e `sobrenome` e retorna o nome completo do usuário.

Exemplo de rota:

```bash
POST http://localhost:3000/nome-completo
```

Corpo da requisição:

```json
{ "nome": "João", "sobrenome": "da Silva" }
```

Resposta:

```json
{ "nomeCompleto": "João da Silva" }
```

### Exercício 3 - Criar uma rota para verificar se um número é par ou ímpar

Crie uma rota que recebe um número como parâmetro de caminho e retorna se o número é par ou ímpar.

Exemplo de rota:

```bash
GET http://localhost:3000/numeros/verificar/7
```

Resposta:

```json
{ "numero": 7, "resultado": "ímpar" }
```

### Exercício 4 - Criar uma rota para inverter uma string

Crie uma rota que recebe uma string como parâmetro de consulta (query parameter) e retorna a string invertida.

Exemplo de rota:

```bash
GET http://localhost:3000/texto/inverter?texto=javascript
```

Resposta:

```json
{ "original": "javascript", "invertido": "tpircsavaj" }
```

### Exercício 5 - Cálculo da equação do segundo grau

Crie uma rota que recebe três parâmetros: `a`, `b` e `c` da equação do segundo grau e retorna o valor do delta e as raízes.

Exemplo de rota:

```bash
GET http://localhost:3000/equacao-segundo-grau/2/4/-6
```

Resposta:

```json
{ "delta": 64, "raizes": [1, -3] }
```

## Referências

- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Thunder Client](https://www.thunderclient.com/)