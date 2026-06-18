---
marp: true
html: true
theme: default
class: normal
backgroundColor: #ffffff
color: #000
lang: pt-BR
title: Programação Web — JWT
author: Renato de Sousa Gomide
style: |
  section {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Marp default theme v4+ uses place-content: safe center center — not flex justify */
    place-content: start;
    box-sizing: border-box;
  }
  /* Title slide: keep default vertical (and horizontal) centering */
  section.cover {
    place-content: safe center center;
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
<!-- _class: cover -->
<!-- _footer: "" -->

![bg left:40% h:50%](../assets/img/logo_trindade.png)

# Programação Web<!-- fit -->

## Tokenização com JWT

*Node.js · Express · PostgreSQL · JWT*

### Prof. Dr. Renato de Sousa Gomide <!-- fit -->

---

<!-- paginate: true -->

## Objetivos da aula

- Entender **por que** APIs precisam provar quem é o usuário a cada requisição
- Conhecer **JWT** (*JSON Web Token*) e suas **três partes**
- Implementar **registro** com senha hasheada (**bcrypt**) e **login** com emissão de token
- Usar **middleware** no Express para **proteger rotas**
- Testar a API com **`Authorization: Bearer`** e aplicar **boas práticas de segurança**

---

## O problema: quem é você?

Imagine um prédio com **catraca** em cada andar. Sem crachá, você teria que mostrar documento **toda hora**.

Em APIs web, o equivalente ao crachá é provar **identidade** a cada requisição — sem o servidor guardar sessão de cada usuário conectado.

> Neste módulo: rotas de **alunos** que antes eram públicas passam a exigir **login**.

---

## Sessão no servidor vs JWT

| Abordagem | Como funciona | Prós | Contras |
|-----------|---------------|------|---------|
| **Sessão** | Servidor guarda quem está logado (memória, Redis, banco) | Revogação imediata | Mais estado; escalar exige compartilhar sessões |
| **JWT (stateless)** | Servidor emite token **assinado**; cliente envia a cada requisição | Simples de escalar; ideal para APIs e SPAs | Revogar antes do vencimento exige estratégia extra |

> JWT = autenticação **stateless**: o servidor **não guarda** lista de tokens válidos.

---

## O que é um JWT?

**JWT** (*JSON Web Token*) é um padrão ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)) para representar informações de forma **compacta** e **assinada**.

- Analogia: 
  - é como um **ingresso de show com holograma**. O organizador (servidor) emite
  - a portaria (middleware) confere se o holograma bate com o que só o organizador sabe fabricar

> Se alguém alterar o conteúdo, a **assinatura** deixa de bater — a falsificação é detectada.

---

## Stack do projeto

<div class="stack-row">
  <figure>
    <img src="../04-manipulacao-de-dados/assets/nodejs-logo.svg" alt="Node.js" />
    <figcaption><small>Node.js + Express</small></figcaption>
  </figure>
  <figure>
    <img src="../04-manipulacao-de-dados/assets/postgresql-elephant.png" alt="PostgreSQL" />
    <figcaption><small>PostgreSQL</small></figcaption>
  </figure>
  <figure>
    <img src="../assets/img/05-jwt/jwt-icon.webp" alt="JWT" />
    <figcaption><small>jsonwebtoken</small></figcaption>
  </figure>
</div>

Bibliotecas principais: 
- **`jsonwebtoken`** (criar/validar tokens)
- **`bcryptjs`** (hash de senhas)

---

## Anatomia de um token

![w:900](../assets/img/05-jwt/jwt-anatomy.png)

Três partes em **Base64URL**, separadas por **ponto** (`.`).

---

## As três partes em detalhe

| Parte | Conteúdo típico |
|-------|-----------------|
| **Header** | Algoritmo (ex.: `HS256`) e tipo `JWT` |
| **Payload** | *Claims*: `id`, `email`, `iat` (emitido em), `exp` (expira em) |
| **Signature** | Assinatura de header + payload com **`JWT_SECRET`** |

> - O **payload não é criptografado** — apenas **codificado**
> - Qualquer um pode **ler**
> - A assinatura impede **alterar** sem ser detectado.

---

## O que **não** colocar no payload

- **Senha** (nem hasheada)
- Dados sensíveis: cartão, CPF completo, etc.

Coloque só o **mínimo** para identificar o usuário: `id`, `email`, `nome`.

> Dúvida comum: "JWT é seguro?" — Sim para **integridade** e **autenticidade**, desde que o segredo permaneça no servidor. Mas o conteúdo é **legível** — trate como um crachá visível, não como cofre.

---

## Fluxo de autenticação

![h:550](../assets/img/05-jwt/auth-flow.svg)

---

## O que é middleware?

Até aqui, cada rota era `(req, res) => { ... }`. **Middleware** intercepta a requisição **antes** do handler final.

```js
function exemploMiddleware(req, res, next) {
  // req  — requisição (headers, body...)
  // res  — resposta
  // next — passa adiante (ou a requisição fica "presa")
  next();
}
```

Analogia: **triagem** na fila antes do guichê. Algo errado? Manda embora (`401`). OK? `next()`.

---

## Middleware global vs por rota

| Forma | Sintaxe | Quando roda |
|-------|---------|-------------|
| **Global** | `app.use(middleware)` | Em **toda** requisição |
| **Por rota** | `app.get('/caminho', middleware, handler)` | Só naquela rota, **antes** do handler |

Você já usou middleware global no módulo Express:

```js
app.use(express.json()); // body JSON → req.body
app.use(cors());         // cabeçalhos CORS
```

---

## Pipeline deste projeto

![](../assets/img/05-jwt/middleware-flow.svg)

`authMiddleware` só entra em **`GET /alunos`**, **`GET /alunos/:id`** e **`GET /auth/me`**.

Rotas de **login** e **registro** permanecem **públicas**.

---

## Registro — senha com hash

A senha **nunca** vai ao banco em texto puro. Guardamos um **hash** — transformação **unidirecional**.

```js
const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

const result = await query(
  'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, created_at',
  [nome, email, senhaHash]
);
```

> `RETURNING` devolve o usuário **sem** o campo `senha` na resposta da API.

---

## O que é *salt*?

- *Salt* é um valor **aleatório** gerado para **cada senha** antes do hash. O bcrypt gera o salt automaticamente e o **embute** no hash final.

- Analogia: salgar um prato antes de cozinhar. Dois pratos iguais (mesma senha `123456`) ficam com "sabor" diferente — um atacante não descobre senhas iguais comparando hashes.

- No login: **`bcrypt.compare(senha, usuario.senha)`** repete o processo com o salt salvo.

---

## Login — emissão do token

Após validar email e senha, o servidor **assina** um payload mínimo:

```js
const token = jwt.sign(
  { id: usuario.id, nome: usuario.nome, email: usuario.email },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
);

return res.json({ token });
```

O cliente **guarda** o token e o envia nas próximas requisições.

---

## Cabeçalho `Authorization: Bearer`

Padrão mais usado em APIs REST:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

- **`Bearer`** = "quem porta este token"
- O token vem **depois** do espaço
- Sem esse cabeçalho → **401 Token não informado**

---

## Middleware de autenticação

Arquivo `src/middleware/auth.js` — a **portaria** do JWT:

```js
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não informado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // disponível no handler
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
```

---

## Três detalhes do middleware

1. **`return res.status(...)`** — encerra aqui; **não** chama `next()` → handler nunca roda
2. **`req.usuario = payload`** — middleware **enriquece** `req` para as rotas seguintes
3. **`next()`** — só quando token é **válido** e **não expirado**

Token ausente, malformado, assinado com segredo errado ou **expirado** → **401 Unauthorized**.

---

## Protegendo rotas

Basta **inserir o middleware** entre a rota e o handler:

```js
app.get('/alunos', authMiddleware, async (req, res) => {
  const alunos = await alunoModel.getAll();
  return res.json(alunos);
});
```

Sintaxe: `app.METODO(caminho, middleware, handler)`. Vários middlewares? Express executa **da esquerda para a direita**.

---

## Rotas da API

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| `GET` | `/` | Não | Informações sobre a API |
| `POST` | `/auth/register` | Não | Cadastra usuário |
| `POST` | `/auth/login` | Não | Retorna JWT |
| `GET` | `/auth/me` | Sim | Dados do usuário logado |
| `GET` | `/alunos` | Sim | Lista alunos |
| `GET` | `/alunos/:id` | Sim | Busca aluno por ID |

---

## Configuração (`.env`)

| Variável | Descrição |
|----------|-----------|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Conexão PostgreSQL |
| `JWT_SECRET` | Segredo longo e aleatório para assinar tokens |
| `JWT_EXPIRES_IN` | Validade (ex.: `1h`, `15m`) |

Gerar segredo seguro:

```bash
npm run generate:jwt-secret
```

> Nunca commite o `.env` real. Use `npm run dev` para subir na porta **3000**.

---

## Boas práticas de segurança

1. **`JWT_SECRET` forte** — `npm run generate:jwt-secret`
2. **HTTPS em produção** — token trafega a cada requisição
3. **Expiração curta** — `JWT_EXPIRES_IN` de horas ou minutos
4. **Payload enxuto** — busque dados frescos no banco (`GET /auth/me`)
5. **Senhas com hash** — bcrypt; nunca logue senhas ou tokens completos
6. **Revogação** — JWT sozinho não "desloga" no servidor até expirar

---

## Resumo

- **JWT** = crachá assinado pelo servidor; cliente envia a cada requisição
- **Header · Payload · Signature** — payload legível, assinatura garante integridade
- **bcrypt** hasheia senhas no registro; **bcrypt.compare** no login
- **authMiddleware** valida token e preenche **`req.usuario`**
- Rotas protegidas: **`app.get('/rota', authMiddleware, handler)`**

---

## Próximos passos

- Distinguir token **expirado** vs **inválido** (código `TOKEN_EXPIRADO`)
- Tópicos avançados: *refresh token*, blacklist, logout imediato

---

## Referências

- [jwt.io](https://jwt.io/) — decodificar e entender tokens
- [RFC 7519 — JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519)
- Bibliotecas principais: 
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
