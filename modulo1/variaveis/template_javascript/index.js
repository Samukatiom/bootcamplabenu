
let nome
let idade
console.log(typeof nome)
console.log(typeof idade)
//A resposta foi undefined, pois não tem valor dentro da variáveis nome e idade

let userName = prompt('Qual é seu nome?')
let userAge = prompt('Quantos anos você tem?')
console.log(typeof userName)
console.log(typeof userAge)
//Foi impresso da tela que as duas variaveis(userName e userAge) são uma string, pois o prompt devolve apenas valores strings

console.log('Olá',userName,'você tem',userAge,'anos')

let parana = prompt('Você mora no paraná? Responda sim ou não.')
let dev = prompt('Você é um desenvolvedor? Responda sim ou não.')
let computador = prompt('Você tem computador? Responda sim ou não.')
console.log('Você mora no paraná? -', parana)
console.log('Você é um desenvolvedor? -', dev)
console.log('Você tem computador? -',computador)

let a = 10
let b = 25
const c = a
a = b
b = c
console.log('O novo valor de a é', a)
console.log('O novo valor de b é', b)

//Desafio:
let sPrimeiroNumero = prompt('Digite um número')
let sSegundoNumero = prompt('Digite mais um número')
let nPrimeiroNumero = Number(sPrimeiroNumero)
let nSegundoNumero = Number(sSegundoNumero)
let soma = nPrimeiroNumero + nSegundoNumero
let multiplicacao = nPrimeiroNumero * nSegundoNumero
console.log('O primeiro número somado ao segundo número resulta em:', soma)
console.log('O primeiro número multiplicado pelo segundo número resulta em:', multiplicacao)