const pesquisarUsuario = async (id) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
  const data = await response.json()
  return data
}

console.log('inicio')

const usuario = await pesquisarUsuario(2)
console.log(usuario)

console.log('fim')