# JavaScript moderno: ES6+ features e boas práticas

## Sumário
- [Objetivos](#objetivos)
- [Introdução ao JavaScript Moderno](#introdução-ao-javascript-moderno)
- [Declaração de Variáveis e Escopo](#declaração-de-variáveis-e-escopo)
- [Funções e Arrow Functions](#funções-e-arrow-functions)
- [Strings e Template Literals](#strings-e-template-literals)
- [Manipulação de Dados](#manipulação-de-dados)
- [Novas Estruturas de Dados](#novas-estruturas-de-dados)
- [Recursos Recentes](#recursos-recentes)
- [Exercícios propostos](#exercícios-propostos)

## Objetivos
- Compreender as principais características do JavaScript moderno (ES6+)
- Aprender a utilizar recursos avançados da linguagem
- Adotar boas práticas de programação em JavaScript

## Introdução ao JavaScript Moderno
O JavaScript moderno, também conhecido como ES6+ (ECMAScript 2015 e versões posteriores), trouxe uma série de melhorias significativas para a linguagem. Essas atualizações não apenas tornaram o código mais legível e conciso, mas também introduziram novos conceitos e funcionalidades que permitem aos desenvolvedores escrever código mais eficiente e poderoso.

## Declaração de Variáveis e Escopo
Uma das mudanças mais notáveis foi a introdução de novas formas de declarar variáveis. As palavras-chave `let` e `const` substituíram em grande parte o uso de `var`, oferecendo um controle mais preciso sobre o escopo das variáveis e ajudando a prevenir erros comuns relacionados à elevação (hoisting).

```javascript
// Exemplo de escopo com let
if (true) {
  let x = 10;
  console.log(x); // 10
}
console.log(x); // ReferenceError: x is not defined

// Uso de const para valores imutáveis
const PI = 3.14159;
PI = 3; // TypeError: Assignment to a constant variable
```
e
```javascript
// temporal dead zone (TDZ)
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;

// Comparação com var
console.log(y); // undefined (devido ao hoisting)
var y = 10;
```

## Funções e Arrow Functions
As arrow functions revolucionaram a forma como escrevemos funções em JavaScript. Além de oferecer uma sintaxe mais concisa, elas também resolvem problemas comuns relacionados ao `this` léxico.

```javascript
// Função tradicional
function sum(a, b) {
  return a + b;
}

// Arrow function equivalente
let sum = (a, b) => a + b;
// ou
sum = (a, b) => {
  return a + b;
}

// Arrow function com this léxico
const obj = {
  name: "John",
  greet: function() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`);
    }, 1000);
  }
};

// Parâmetros com valores padrão
const greet = (name = 'Guest') => `Hello, ${name}!`;
console.log(greet()); // Hello, Guest!
console.log(greet('Denecley')); // Hello, Denecley!

// Arrow function com retorno de objeto implícito
const createUser = (name, age) => ({ name, age });
console.log(createUser('Denecley', 20)); // { name: 'Denecley', age: 20 }
```

## Strings e Template Literals
Template literals trouxeram uma nova maneira de criar strings, permitindo a interpolação de expressões e a criação de strings multilinhas de forma mais elegante.

```javascript
const name = "Alice";
const age = 30;

// Template literal com interpolação
console.log(`Hello, my name is ${name} and I'm ${age} years old.`);

// String multilinha
const multiline = `
  This is a
  multiline string
  using template literals.
`;
```

## Manipulação de Dados
A desestruturação (destructuring) e os operadores spread e rest simplificaram significativamente a manipulação de arrays e objetos.

```javascript
// Desestruturação de objeto
const person = { name: "Bob", age: 25 };
const { name, age } = person;

// Desestruturação de array
const numbers = [1, 2, 3];
const [first, ...rest] = numbers;

console.log(first); // 1
console.log(rest); // [2, 3]

// Operador spread
const newArray = [...numbers, 4, 5];
console.log(newArray); // [1, 2, 3, 4, 5]

const newObject = { ...person, job: "Developer" };
console.log(newObject); // { name: 'Bob', age: 25, job: 'Developer' }

// Atribuição via desestruturação com renomeação e valores padrão
// Renomeando variáveis na desestruturação
const { name: userName, age = 18 } = person;

console.log(userName); // Bob

// Desestruturação em parâmetros de função
function printUserInfo({ name, age = 18 }) {
  console.log(`${name} is ${age} years old`);
}

printUserInfo(person); // Bob is 25 years old
```

## Novas Estruturas de Dados
Novas estruturas de dados como Map e Set expandiram as opções disponíveis para os desenvolvedores.

```javascript
// Map
const map = new Map();
map.set('key', 'value');
console.log(map.get('key')); // value

// Set
const set = new Set([1, 2, 3, 3, 4]);
console.log(set.size); // 4 (duplicate value is ignored)
```

## Recursos Recentes
Recursos como optional chaining e nullish coalescing simplificaram a forma como lidamos com propriedades potencialmente indefinidas e valores falsy.

```javascript
// Optional chaining
const user = { address: { street: 'Main St' } };
console.log(user?.address?.street); // Main St
console.log(user?.contact?.email); // undefined (no error)

// Nullish coalescing
const value = null ?? 'default';
console.log(value); // 'default'
```

## Exercícios propostos

### 1. Processador de Dados de Usuários
Desenvolva uma função que processe um array de objetos contendo dados de usuários:
- Use desestruturação para extrair dados como nome, idade e endereço
- Utilize arrow functions e métodos modernos de array (map, filter, reduce)
- Implemente validação de dados usando nullish coalescing e optional chaining
- Crie um novo array com dados formatados usando spread operator
- Agrupe usuários por faixa etária usando Map

### 2. Sistema de Template de Emails
Crie um sistema para gerar templates de emails:
- Use template literals para criar templates com múltiplas linhas
- Implemente uma função que aceite diferentes parâmetros com valores default
- Utilize desestruturação para extrair dados do objeto de configuração

### 3. Gerenciador de Lista de Tarefas
Implemente um gerenciador de tarefas que:
- Use Set para armazenar tarefas únicas
- Utilize const e let apropriadamente para controle de escopo
- Implemente funções para adicionar, remover e marcar tarefas como concluídas
- Use desestruturação em arrays para reorganizar tarefas
- Implemente filtros de busca usando arrow functions

### 4. Conversor de Dados
Desenvolva um utilitário de conversão de dados que:
- Aceite diferentes formatos de entrada (arrays, objetos, Maps)
- Use métodos de Map para transformar dados
- Implemente desestruturação profunda de objetos
- Utilize spread operator para mesclar dados
- Trate valores ausentes com operador nullish coalescing

### 5. Formatador de Relatórios
Crie um sistema para gerar relatórios formatados:
- Use template literals para estruturar o relatório
- Implemente funções com parâmetros rest para aceitar múltiplos dados
- Utilize destructuring para extrair e organizar dados
- Use Map para cache de dados processados
- Implemente validações usando optional chaining

## Recursos adicionais
- [Javascript Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN Web Docs: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ECMAScript 6 - ECMAScript 2015](https://www.ecma-international.org/ecma-262/6.0/)
- [JavaScript.info](https://javascript.info/)
- [Exploring ES6](https://exploringjs.com/es6/)
