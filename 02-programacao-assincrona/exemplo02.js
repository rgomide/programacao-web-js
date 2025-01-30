const verificarPar = (numero) => {
  return new Promise((resolve, reject) => {
    console.log(`Verificando se ${numero} é par`)
    if (numero % 2 === 0) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

let promises = []

promises.push(verificarPar(10))
promises.push(verificarPar(11))
promises.push(verificarPar(12))

Promise.all(promises)
  .then(resultados => console.log('assíncrono', resultados))
  .catch(erro => console.error(erro))

promises = []

promises.push(verificarPar(13))
promises.push(verificarPar(14))
promises.push(verificarPar(15))

const resultados = await Promise.all(promises)
console.log('síncrono', resultados)