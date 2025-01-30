const validarNumero = (numero) => {
  return new Promise((resolve, reject) => {
    const timeout = Math.random() * 1000

    setTimeout(() => {
      const type = typeof numero;
      if (type !== 'number') {
        reject(`O valor fornecido não é um número: ${numero} -> ${type}`);
      }
  
      resolve(numero);
    }, timeout)
  });
}

// Com promises
validarNumero(10)
  .then(numero => console.log(`O número ${numero} é válido`))
  .catch(erro => console.error(erro));

validarNumero('10')
  .then(numero => console.log(`O número ${numero} é válido`))
  .catch(erro => console.error(erro));

console.log( validarNumero(20))

// Com async/await
let numero = await validarNumero(10)
console.log(numero)

try {
  numero = await validarNumero('10')
  console.log(numero)
} catch (erro) {
  console.error(erro)
}

console.log('fim')