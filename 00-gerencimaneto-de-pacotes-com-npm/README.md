# Gerenciamento de pacotes com npm e criação de scripts

## Sumário
- [Objetivos](#objetivos)
- [Comandos Básicos](#comandos-básicos)
  - [1. Introdução ao npm (Node Package Manager)](#1-introdução-ao-npm-node-package-manager)
  - [2. Inicialização de um projeto](#2-inicialização-de-um-projeto)
  - [3. Instalação de pacotes](#3-instalação-de-pacotes)
  - [4. Gerenciamento de versões de pacotes](#4-gerenciamento-de-versões-de-pacotes)
  - [5. Atualização de pacotes](#5-atualização-de-pacotes)
  - [6. Remoção de pacotes](#6-remoção-de-pacotes)
  - [7. npm scripts](#7-npm-scripts)
  - [8. Execução de scripts](#8-execução-de-scripts)
  - [9. Variáveis de ambiente em scripts npm](#9-variáveis-de-ambiente-em-scripts-npm)
- [Exercícios Resvolvidos](#exercícios-resvolvidos)
- [Exercícios Propostos](#exercícios-propostos)
- [Referências](#referências)

## Objetivos
- Compreender o papel do npm no ecossistema Node.js
- Aprender a gerenciar dependências de projetos
- Explorar a criação e uso de scripts npm
- Praticar a instalação e uso de bibliotecas externas

## Comandos Básicos

### 1. Introdução ao npm (Node Package Manager)
O `npm` (Node Package Manager) é o gerenciador de pacotes padrão para o ecossistema Node.js. Ele é uma ferramenta essencial que permite aos desenvolvedores compartilhar, descobrir e reutilizar código JavaScript de forma eficiente. Com o `npm`, é possível gerenciar dependências, versões e scripts de projeto de maneira automatizada, tornando o desenvolvimento mais produtivo e organizado.

Quando comparado ao `Yarn`, outro popular gerenciador de pacotes, o `npm` oferece funcionalidades similares, mas com algumas diferenças importantes. Enquanto o `npm` é mantido pela própria equipe do Node.js e vem instalado por padrão, o `Yarn` foi desenvolvido pelo Facebook para resolver algumas limitações iniciais do `npm`, como velocidade de instalação e consistência entre ambientes. Atualmente, com as melhorias implementadas nas versões mais recentes do `npm`, ambas as ferramentas são excelentes opções, e a escolha entre elas frequentemente se resume a preferência pessoal ou requisitos específicos do projeto.

### 2. Inicialização de um projeto
#### Comando:
```bash
npm init -y
```
#### Estrutura do arquivo `package.json`
A estrutura do arquivo `package.json` é essencial para o funcionamento do `npm`. Ele define as propriedades do projeto, como o nome, versão, descrição, scripts, dependências, etc. Cada propriedade é crucial para o gerenciamento do projeto e a execução de scripts npm.

Segue o exemplo de um arquivo `package.json`:

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Descrição do meu projeto",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### 3. Instalação de pacotes
#### Instalação de dependências de produção 
```bash
npm install <pacote>
```

#### Instalação de dependências de desenvolvimento
```bash
npm install --save-dev <pacote>
```

#### Instalação global de pacotes
```bash
npm install -g <pacote>
```

### 4. Gerenciamento de versões de pacotes
Semântica de versionamento (SemVer), que funciona como uma especificação de versão para pacotes `npm`.

O versionamento semântico SemVer segue o padrão `MAJOR.MINOR.PATCH`, no qual:

- `MAJOR` é a versão principal, que pode causar mudanças significativas no código.
- `MINOR` é a versão secundária, que pode adicionar novas funcionalidades sem causar mudanças significativas no código.
- `PATCH` é a versão de correção, que pode corrigir bugs sem causar mudanças significativas no código.

Utiliza-se o uso de `^`, `~`, e versões exatas no arquivo `package.json`. O caractere `^` permite atualizações que não alteram o primeiro número (major), enquanto `~` permite atualizações apenas no último número (patch). Como, por exemplo:

- `^1.0.0` permite atualizações que não alteram o primeiro número (major), como `1.1.0`, `1.2.0`, etc.
- `~1.0.0` permite atualizações apenas no último número (patch), como `1.0.1`, `1.0.2`, etc.
- `1.0.0` permite apenas a versão exata `1.0.0`.

### 5. Atualização de pacotes
#### Verificação de atualizações
```bash
npm outdated
```

#### Atualização de pacotes
```bash
npm update
```

### 6. Remoção de pacotes
```bash
npm uninstall <pacote>
```

### 7. npm scripts

#### Scripts Predefinidos
O npm possui alguns scripts predefinidos que têm comportamentos especiais. O mais comum é o `start`, que pode ser executado simplesmente com `npm start` (sem necessidade do comando `run`). Outros scripts predefinidos incluem `test`, `install`, `preinstall`, `postinstall`, `uninstall`, `preuninstall`, `postuninstall`, `prepublish`, entre outros. Por exemplo, o script `test` é frequentemente usado para executar testes automatizados do projeto, enquanto o `start` geralmente inicia a aplicação em ambiente de desenvolvimento.

#### Criação de Scripts Personalizados
Além dos scripts predefinidos, você pode criar scripts personalizados com qualquer nome no seu `package.json`. Estes scripts podem executar qualquer comando do terminal, chamar outros scripts, ou combinar múltiplos comandos. Por exemplo, você pode criar scripts para:

- Compilar código
- Executar linters
- Fazer deploy
- Iniciar ambientes de desenvolvimento
- Executar tarefas de build
- Realizar migrações de banco de dados

Exemplo de scripts personalizados no `package.json`:
```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "build": "webpack --mode production",
    "lint": "eslint src/",
    "format": "prettier --write 'src/**/*.js'",
    "deploy": "npm run build && aws s3 sync dist/ s3://meu-bucket"
  }
}
```

### 8. Execução de scripts
```bash
npm run <script>
```

### 9. Variáveis de ambiente em scripts npm
O Node.js possui suporte nativo para variáveis de ambiente através do objeto `process.env`. Existem várias maneiras de trabalhar com variáveis de ambiente em scripts npm:

#### Definindo variáveis diretamente no script
```json
{
  "scripts": {
    "dev": "NODE_ENV=development node server.js",
    "start": "NODE_ENV=production node server.js"
  }
}
```

#### Usando arquivos .env
Node.js 20.6.0+ suporta nativamente arquivos `.env` usando a flag `--env-file`:
```json
{
  "scripts": {
    "dev": "node --env-file=.env server.js"
  }
}
```

## Exercícios Resvolvidos

### Exercício 1: Configuração inicial e instalação de pacotes
1. Crie um novo diretório para o projeto e navegue até ele
2. Inicialize um novo projeto npm usando `npm init -y`
3. Instale a biblioteca prompt-sync usando `npm install prompt-sync`

### Exercício 2: Calculadora simples
Crie um arquivo `calculadora.js` com o seguinte conteúdo:

```javascript
const prompt = require('prompt-sync')();

const num1 = parseFloat(prompt('Digite o primeiro número: '));
const operacao = prompt('Digite a operação (+, -, *, /): ');
const num2 = parseFloat(prompt('Digite o segundo número: '));

let resultado;

switch (operacao) {
    case '+':
        resultado = num1 + num2;
        break;
    case '-':
        resultado = num1 - num2;
        break;
    case '*':
        resultado = num1 * num2;
        break;
    case '/':
        resultado = num1 / num2;
        break;
    default:
        console.log('Operação inválida');
        process.exit(1);
}

console.log(`Resultado: ${resultado}`);
```

Execute o script usando `node calculadora.js`

### Exercício 3: Verificador de palíndromo
Crie um arquivo `palindromo.js` com o seguinte conteúdo:

```javascript
const prompt = require('prompt-sync')();

function ehPalindromo(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return str === str.split('').reverse().join('');
}

const palavra = prompt('Digite uma palavra ou frase: ');

if (ehPalindromo(palavra)) {
    console.log(`"${palavra}" é um palíndromo.`);
} else {
    console.log(`"${palavra}" não é um palíndromo.`);
}
```

Execute o script usando `node palindromo.js`

### Exercício 4: Criação de scripts npm
1. Abra o arquivo `package.json`
2. Adicione os seguintes scripts:

```json
"scripts": {
  "start": "node calculadora.js",
  "palindromo": "node palindromo.js"
}
```

3. Execute os scripts usando `npm run start` e `npm run palindromo`

### Exercício 5: Uso de variáveis de ambiente
1. Crie um arquivo `.env` com o seguinte conteúdo:

```
NAME=Denecley
AGE=20
```

2. Crie um arquivo `envVarTest.js` com o seguinte conteúdo:

```javascript
console.log(`Nome: ${process.env.NAME}`);
console.log(`Idade: ${process.env.AGE}`);
```

3. Execute o script usando `node envVarTest.js`

4. Crie um script npm para executar o `envVarTest.js`

5. Execute o script usando `npm run envVarTest`

## Exercícios Propostos

### Exercício 1: Gerador de Senhas
1. Instale o pacote [generate-password](https://www.npmjs.com/package/generate-password) usando npm
2. Crie um arquivo `passwordGenerator.js`
3. Implemente um programa que:
   - Solicite ao usuário o comprimento desejado da senha
   - Pergunte se deve incluir números
   - Pergunte se deve incluir símbolos especiais
   - Gere e exiba uma senha com base nas preferências do usuário
4. Adicione um script no `package.json` para executar o gerador de senhas

### Exercício 2: Jogo de Adivinhação com Dicas
1. Instale o pacote [chalk](https://www.npmjs.com/package/chalk) usando npm (para colorir o output no terminal)
2. Crie um arquivo `numberGuessing.js`
3. Implemente um jogo que:
   - Gere um número aleatório entre 1 e 100
   - Permita que o usuário faça tentativas
   - A cada tentativa, indique se o número é maior ou menor
   - Use cores diferentes para diferentes tipos de mensagens:
     - Verde para acerto
     - Amarelo para dicas
     - Vermelho para erro
   - Mostre o número de tentativas ao final
4. Adicione um script no arquivo `package.json` para executar o jogo

### Exercício 3: Jogo da Forca
1. Instale os pacotes:
   - [chalk](https://www.npmjs.com/package/chalk) para cores no terminal
   - [figlet](https://www.npmjs.com/package/figlet) para arte ASCII
2. Crie um arquivo `hangman.js`
3. Implemente o clássico jogo da forca que:
   - Tenha uma lista predefinida de palavras por categoria
   - Permita ao jogador escolher a categoria
   - Mostre:
     - A palavra oculta com underscores (_)
     - Letras já tentadas
     - Número de tentativas restantes
     - Desenho da forca usando caracteres ASCII
   - Use cores diferentes para:
     - Acertos (verde)
     - Erros (vermelho)
     - Informações (azul)
     - Arte ASCII do título (amarelo)
   - Permita jogar novamente ao final
4. Adicione um script no package.json para iniciar o jogo

## Referências
- [Documentação oficial do npm](https://docs.npmjs.com/)
- [Guia de scripts npm](https://docs.npmjs.com/cli/v7/using-npm/scripts)
- [Semântica de versionamento SemVer](https://semver.org/)
- [Documentação do prompt-sync](https://www.npmjs.com/package/prompt-sync)
- [Flag --env-file](https://nodejs.org/api/cli.html#--env-fileconfig)