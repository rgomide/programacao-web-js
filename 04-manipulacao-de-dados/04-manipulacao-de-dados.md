---
marp: true
html: true
theme: default
class: normal
backgroundColor: #ffffff
color: #000
lang: pt-BR
title: Programação Web — Manipulação de Dados
author: Renato de Sousa Gomide
style: |
  section {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  h1 {
    border-bottom: 2px solid #000;
  }
  h2 {
    margin-top: 10px;
  }
  strong {
    color: #dd0000;
  }
  footer {
    font-size: 12px;
    color: #7f8c8d;
  }
  blockquote {
    background-color: #fff6f6;
    padding: 10px;
    color: #000;
    border-left: 5px solid #ff0000;
  }
  p img {
    margin: 0 auto;
    display: block;
  }
  pre {
    font-size: 0.78em;
  }
  .stack-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
  .stack-row figure {
    flex: 1 1 0;
    min-width: 0;
    max-width: 24%;
    margin: 0;
    padding: 0 0.15rem;
    text-align: center;
    box-sizing: border-box;
  }
  .stack-row figure img {
    display: block;
    margin: 0 auto;
    max-height: 64px;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }
  .stack-row figcaption {
    margin-top: 0.25rem;
    font-size: 0.65em;
    line-height: 1.2;
    word-break: break-word;
  }
---

<!-- paginate: false -->
<!-- _footer: "" -->

![bg left:40% h:50%](../assets/img/logo_trindade.png)

# Programação Web<!-- fit -->

## Manipulação de dados

*Node.js · Knex.js · PostgreSQL*

### Prof. Dr. Renato de Sousa Gomide <!-- fit -->

<div style="margin-top: 1.2rem; display: flex; align-items: center; gap: 1.5rem; justify-content: flex-end; padding-right: 8%;">
  <img src="./assets/nodejs-logo.svg" alt="Node.js" height="72" />
  <img src="./assets/javascript-logo.png" alt="JavaScript" width="72" height="72" />
  <img src="./assets/knex-logo.svg" alt="JavaScript" width="72" height="72" />
  <img src="./assets/postgresql-elephant.png" alt="PostgreSQL" width="72" height="72" />
</div>

---

<!-- paginate: true -->

## Objetivos da aula

- Relacionar **persistência** em banco com código **Node.js**
- Configurar o **Knex.js** como *query builder* para **PostgreSQL**
- Reconhecer o padrão **CRUD** em módulos de **modelo**
- Ler e escrever consultas com **`.select`**, **`.where`** (um ou **vários** critérios), **`.insert`**, **`.join`**, **`.limit`** e **`.offset`**
- Saber **encerrar o pool** de conexões com **`db.destroy()`** em scripts

---

## Por que um banco relacional?

- Dados **estruturados** em **tabelas** com **tipos** e **restrições**
- **Integridade** por chaves primárias e estrangeiras
- Consultas com **SQL** (o Knex **gera** SQL a partir da API em JS)

> Neste projeto o domínio é uma **escola**: alunos, endereços, cursos e matrículas.

---

## Stack

<div class="stack-row">
  <figure>
    <img src="./assets/nodejs-logo.svg" alt="Node.js" />
    <figcaption><small>Runtime Node.js</small></figcaption>
  </figure>
  <figure>
    <img src="./assets/javascript-logo.png" alt="JavaScript" />
    <figcaption><small>Linguagem JavaScript</small></figcaption>
  </figure>
  <figure>
    <img src="./assets/knex-logo.svg" alt="Knex.js" />
    <figcaption><small>Knex.js</small></figcaption>
  </figure>
  <figure>
    <img src="./assets/postgresql-elephant.png" alt="PostgreSQL" />
    <figcaption><small>PostgreSQL</small></figcaption>
  </figure>
</div>

>**Knex.js** — camada entre seu código e o driver **`pg`**, com API uniforme e *pool* de conexões.

---

## Modelo lógico (escola)

| Entidade | Papel |
|----------|--------|
| **aluno** | Cadastro do estudante |
| **endereco** | Vários endereços por aluno (**1:N**) |
| **curso** | Oferta de curso |
| **matricula** | Aluno inscrito em curso (**N:N**), com data |

Chave composta em **matricula**: `(id_aluno, id_curso)`.

---

## O que é o Knex.js?

- **Query builder**: encadeamento de métodos → SQL **parametrizado**
- Menos concatenação manual de strings → ajuda a evitar **SQL injection**
- Mesma API útil para evoluir para **migrações** em projetos maiores

Não é obrigatoriamente um **ORM** completo (objetos ricos com lazy loading); aqui usamos **tabelas** e **objetos simples** (`insert` / `select`).

---

## Configuração da conexão

Arquivo `src/db/index.js`: uma instância **`knex(config)`** exportada para todos os modelos.

```js
const knex = require('knex');

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 2, max: 10 },
};

const db = knex(config);
module.exports = db;
```

Variáveis carregadas com **`node --env-file=.env`** (ver `npm run start`).

---

## CRUD em uma frase cada

| Letra | Significado | Exemplo Knex |
|-------|-------------|----------------|
| **C** | Create | `.insert(dados).returning('*')` |
| **R** | Read | `.select('*')` / `.where(...).first()` |
| **U** | Update | `.where({ id }).update(patch).returning('*')` |
| **D** | Delete | `.where({ id }).del()` |

No **PostgreSQL**, **`.returning(...)`** traz a linha afetada logo após `insert` ou `update`.

---

## Leitura — listar e buscar por id

```js
const db = require('../db');

async function findAll() {
  return db('aluno').select('*');
}

async function findById(id) {
  return db('aluno').where('id', id).first();
}
```

Equivale mentalmente a `SELECT * FROM aluno` e `SELECT * FROM aluno WHERE id = ? LIMIT 1`.

---

## WHERE com **vários** critérios (`AND`)

Em `src/model/endereco.js`, **dois parâmetros** restringem a busca (rua **e** número):

```js
async function findByRuaAndNumero(rua, numero) {
  return db('endereco').where({ rua, numero }).select('*');
}
```

O objeto em **`.where({ rua, numero })`** vira `WHERE rua = ? AND numero = ?` com valores **parametrizados**. Forma equivalente: **`.where('rua', rua).where('numero', numero)`**.

---

## Criação e atualização

```js
async function create(aluno) {
  const rows = await db('aluno').insert(aluno).returning('*');
  return rows[0];
}

async function update(id, aluno) {
  const rows = await db('aluno').where({ id }).update(aluno).returning('*');
  return rows[0];
}
```

> **`returning('*')`** evita outra ida ao banco só para montar o objeto retornado.

---

## Remoção

```js
async function remove(id) {
  return db('aluno').where({ id }).del();
}
```

> Atenção a **chaves estrangeiras**: pode ser preciso apagar **matrículas** e **endereços** antes do aluno, conforme as `ON DELETE` do seu esquema.

---

## Dados relacionados — duas consultas

Padrão: buscar a entidade principal, depois os filhos (claro e fácil de depurar).

```js
async function findWithEnderecos(id) {
  const aluno = await findById(id);
  if (!aluno) return null;

  const enderecos = await db('endereco').where('id_aluno', id);
  return { ...aluno, enderecos };
}
```

> Como em **`src/model/aluno.js`**: reutiliza **`findById`** em vez de repetir a consulta ao aluno.

---

## Dados relacionados — `join`

Um curso com alunos matriculados (trecho simplificado do projeto):

```js
async function findWithAlunos(id) {
  const curso = await db('curso').where({ id }).first();
  if (!curso) return null;

  const alunos = await db('aluno')
    .select('aluno.*', 'matricula.data_matricula')
    .join('matricula', 'aluno.id', 'matricula.id_aluno')
    .where('matricula.id_curso', id);

  return { ...curso, alunos };
}
```

---

## Uso dos modelos no `index.js`

```js
const { Aluno, Curso, Endereco, Matricula } = require('./model');

const novoAluno = await Aluno.create({
  nome: 'Roberto Gomide',
  email: 'roberto@email.com',
  data_nascimento: '1990-01-15',
});

const alunoComEndereco = await Aluno.findWithEnderecos(novoAluno.id);
```

> Organização: **`src/model/`** exporta funções; **`src/index.js`** orquestra o fluxo de demonstração.

---

## Encerrar o pool ao fim do script

```js
async function main() {
  try {
    // ... chamadas aos modelos ...
  } catch (error) {
    console.error(error);
  } finally {
    const db = require('./db');
    await db.destroy();
  }
}

main();
```

**`destroy()`** libera conexões e permite que o processo **termine** sem ficar pendurado no *event loop*.

---

## Paginação — `limit` e `offset`

- **`limit`**: quantas linhas retornar (tamanho da “página”).
- **`offset`**: quantas linhas **ignorar** a partir do início do resultado (já **ordenado**).
- **Página** `p` (a partir de 1), tamanho `pageSize`: `offset = (p - 1) * pageSize`.

```js
const pageSize = 10;
const page = 2;
const offset = (page - 1) * pageSize;

const rows = await db('aluno')
  .select('*')
  .orderBy('id')
  .limit(pageSize)
  .offset(offset);
```

> Sempre combine com **`orderBy`** estável. Em REST, `limit` e `offset` costumam vir da *query string* (ex.: `GET /alunos?limit=10&offset=0`).

---

## Boas práticas (resumo)

- **Um** módulo de configuração do Knex (`src/db/index.js`)
- **Modelos** por tabela ou agregado estável
- **Tratamento de erros** em operações assíncronas
- **Validação** de entrada antes de persistir (próximo passo didático)
- **Ordem consciente** em exclusões respeitando FKs

---

## Próximos passos sugeridos

- Contagem total e metadados de paginação (ex.: cabeçalho ou campo `total`)
- Ordenação (`orderBy`)
- Busca textual (`whereILike` no PostgreSQL)
- **API REST** com Express — roteiros no [README.md](./README.md) (exercícios de implementação)
- **Migrações Knex** em vez de só `script.sql`

---

## Referências

- [Knex.js — documentação](https://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- Código e instruções detalhadas: [README.md](./README.md)
