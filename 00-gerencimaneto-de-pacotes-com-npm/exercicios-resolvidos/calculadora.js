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