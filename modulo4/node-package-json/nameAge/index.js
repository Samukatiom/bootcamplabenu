// 1 A) Responda como comentário no seu código: Como fazemos para acessar os parâmetros passados na linha de comando para o Node?

//R : Usando o process.argv[]

// B

const userName = process.argv[2]
const age = process.argv[3]
const output= `Olá, ${userName}! Você tem ${age} anos! `

//c

const newAge = Number(age) + 7
const secondOutput = `Olá, ${userName}! Você tem ${age} anos. Em sete anos você terá ${newAge} anos`

//respostas
console.log(output)
console.log(secondOutput)
