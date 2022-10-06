//Exercícios de interpretação de código
//01
// let array
// console.log('a. ', array) (id = será impresso no console: a. undefined)

// array = null
// console.log('b. ', array) (id = será impresso no console: b. null)

// array = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
// console.log('c. ', array.length) (id = será impresso no console: c. 11)

// let i = 0
// console.log('d. ', array[i]) (nesta linha fiquei confuso, então executei o código e entendi, mas não ta valendo né rsrsrs)

// array[i+1] = 19
// console.log('e. ', array)

// const valor = array[i+6]
// console.log('f. ', valor)

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//02
// const frase = prompt("Digite uma frase")

// console.log(frase.toUpperCase().replaceAll("A", "I"), frase.length)
/*(Após o usuário digitar "Subi num ônibus em Marrocos", será impresso no terminal
 "SUBI NUM ÔNIBUS EM MIRROCOS 27 ")*/

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Exercícios de escrita de código
//01
let nomeDoUsuario = prompt('Olá, tudo bem? Qual é seu nome?')
let emailDoUsuario = prompt('Agora digite seu e-mail.')
console.log(`O e-mail ${emailDoUsuario} foi cadastrado com sucesso. Seja bem-vinda(o) ${nomeDoUsuario}!`)

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//02
let comidasPreferidas = ['Pizza', 'Hamburguer', 'Frango a Milanesa', 'Macarrão alho e óleo', 'Chocolate']
console.log(comidasPreferidas)
console.log('Essas são as minhas comidas preferidas:')
console.log(comidasPreferidas[0])
console.log(comidasPreferidas[1])
console.log(comidasPreferidas[2])
console.log(comidasPreferidas[3])
console.log(comidasPreferidas[4])
let userComidasPreferida = prompt('Qual é sua comida preferida?')
comidasPreferidas = ['Pizza', userComidasPreferida, 'Frango a Milanesa', 'Macarrão alho e óleo', 'Chocolate'] //desafio
console.log(`Nova lista:`) //desafio
console.log(comidasPreferidas) //desafio

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//03
let listaDeTarefas = []
let tarefa1 = prompt('Olá, digite sua primeira tarefa.')
let tarefa2 = prompt('Digite sua segunda tarefa.')
let tarefa3 = prompt('Digite sua terceira tarefa.')
listaDeTarefas = [tarefa1, tarefa2, tarefa3]
console.log('Lista de tarefas:')
console.log(listaDeTarefas)
let retirar = prompt('O índice das suas tarefas é 0, 1, 2. Escolha dentre eles qual você quer retirar?')
const nRetirar = Number(retirar)
listaDeTarefas.splice((nRetirar), 1)
console.log(listaDeTarefas)

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Desafios
//01
let fraseDesafio = 'Agora vou listar estás frases para uma array'
let lista = fraseDesafio.split(' ') //usei o método split() com o critério de separação os espaços
console.log(lista)

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//02
let listaDeFrutas = ['Banana', 'Morango', 'Abacaxi', 'Laranja', 'Ameixa']

console.log('indice do Abacaxi:', listaDeFrutas.indexOf('Abacaxi'),'. Tamanho da array:', listaDeFrutas.length)//usei o método idexOf para localizar o index do 'Abacaxi'
