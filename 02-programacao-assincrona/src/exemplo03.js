const cep = '75389269'
const url = `https://viacep.com.br/ws/${cep}/json/`

const response = await fetch(url)
console.log(response)

console.log('\n\n\n')

const data = await response.json()
console.log(data)