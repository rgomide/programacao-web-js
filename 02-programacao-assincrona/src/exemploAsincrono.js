console.log('inicio')

const response = fetch('https://rickandmortyapi.com/api/character/2')

console.log(response)

response
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))

console.log('fim')