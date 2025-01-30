const mostrarNumero = (numero) => {
  console.log(`Mostrando número ${numero}`)
  const timeout = 1000 * Math.random()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(numero)
    }, timeout)
  })
}

const promises = []

promises.push(mostrarNumero(1))
promises.push(mostrarNumero(2))
promises.push(mostrarNumero(3))

const resultado = await Promise.race(promises)
console.log(resultado)
