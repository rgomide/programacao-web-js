const funcaoAssincrona = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve('Operação concluida!')
      } else {
        reject('Erro na operação')
      }
    }, 1000)
  })
}

console.log('inicio')

const minhaPromise = funcaoAssincrona(1) // modificar para 0 para ver o erro

console.log(minhaPromise)

minhaPromise
  .then(resultado => console.log(resultado))
  .catch(erro => console.error(erro))

console.log('fim')