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