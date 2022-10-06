// Exercícios de interpretação de código
//01
// const bool1 = true (id = foi criado uma variável chamada "bool1" do tipo booleana, com valor true) 
// const bool2 = false (id = foi criado uma variável chamada "bool2" do tipo booleana com valor true, com valor false)
// const bool3 = !bool2 (id = foi criado uma variável chamada "bool3" do tipo boolena com valor oposto da variável "bool2" logo a variável em questão tem o valor booleano true)

// let resultado = bool1 && bool2 (id = foi criado uma variável chamada "resultado", do tipo booleno, na qual foi usado o operador "E", que nos resulta no valor false)
// console.log("a. ", resultado) (id = aqui imprimimos no console o seguinte "a. false")

// resultado = bool1 && bool2 && bool3 (id = aqui foi alterado o valor da variável "resultado", na qual foi usado dois operadores "E", para três variaveis, que nos resulta no valor false)
// console.log("b. ", resultado) (id = aqui imprimimos no console o seguinte "b. false")

// resultado = !resultado && (bool1 || bool2) (aqui foi alterado novamente o valor da variável "resultado", na qual foi usado um operador "NÃO" e um operador "E", para três variáveis, que nos resulta no valor true )
// console.log("c. ", resultado) (id = aqui imprimimos no console o seguinte "c. true")

// console.log("d. ", typeof resultado)(id = aqui imprimimos no console o seguinte "d. boolean")

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//02
// let primeiroNumero = prompt("Digite um numero!") (id = foi criado uma variável chamada "primeiroNumero", com o comando prompt("Digite um número!"), devolvendo assim um dado do tipo sting)
// let segundoNumero = prompt("Digite outro numero!") (id = foi criado uma variável chamada "segundoroNumero", com o comando prompt("Digite outro número!"), devolvendo assim um dado do tipo sting)

// const soma = primeiroNumero + segundoNumero (id = aqui foi criado uma variável constante chamada "soma", a qual está contatenando o primeiroNumero com o segundoNumero)

// console.log(soma) (aqui foi dado o comando para imprimir no console a variável "soma", que será uma contenação das duas primeiras variáveis, [exemplo: digito 1 para o primeiro prompt e 2 para o segundo, teremos como resultado 12])

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// //03
// let primeiroNumero = prompt("Digite um numero!")
// let segundoNumero = prompt("Digite outro numero!")

// const soma = Number(primeiroNumero) + Number(segundoNumero) //(id = para sulucionar o problema do meu colega, fiz uma conversão, converti do tipo string para o tipo number )

// console.log(soma)

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Exercícios de escrita de código
//01
let idadeUsuario = prompt('Olá, qual é sua idade?')
let idadeAmigo = prompt('E quantos anos tem seu melhor amigo(a)?')
const isMaior = idadeUsuario > idadeAmigo
console.log('Sua idade é maior do que a do seu melhor amigo?', isMaior)
console.log('A diferença de idade de vocês é', Number(idadeUsuario) - Number(idadeAmigo))

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//02
let numeroPar = prompt('Olá, digite um número par')
console.log('Se dividirmos o número que você digitou por 2 o resto da divisão será:', Number(numeroPar % 2))
// se o usuário digitar apenas números pares, sempre no console será impresso : "Se dividirmos o número que você digitou por 2 o resto da divisão será: 0", porém se o usuário digitar um número impar, será impresso após a frase um número diferente de 0

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//03
let anosDeVida = prompt('Olá, quantos anos de vida você tem?')
let mesesDeVida = Number(anosDeVida) * 12
let diasDeVida = anosDeVida * 365 //considerando 365 a média de dias no ano
let horasDeVida = diasDeVida * 24 // considerando 24 a média de horas no dia
console.log('Você tem', mesesDeVida, 'meses de vida!')
console.log('Você tem', diasDeVida, 'dias de vida!')
console.log('Você tem', horasDeVida, 'horas de vida!')

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//04
let srcNumero1 = prompt('Olá, digite um número.')
let srcNumero2 = prompt('Digite mais um número.')
let numNumero1 = Number(srcNumero1)
let numNumero2 = Number(srcNumero2)
let isTrueOrFalse = numNumero1 > numNumero2
console.log('O primeiro número é maior que o segundo?', isTrueOrFalse)
isTrueOrFalse = numNumero1 === numNumero2
console.log('O primeiro número é igual ao segundo?', isTrueOrFalse)
isTrueOrFalse = numNumero1 % numNumero2 === 0
console.log('O primeiro número é divisível pelo segundo?', isTrueOrFalse)
isTrueOrFalse = numNumero2 % numNumero1 === 0
console.log('O segundo número é divisível pelo primeiro?', isTrueOrFalse)

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Desafios
//01
//a
let fahrenheit = 77
let kelvin = (fahrenheit - 32)*(5/9) + 273.15
console.log('Se o termometro de unidade Fahrenheit está medindo', fahrenheit,'°F', 'então o termometro de unidade Kelvin deve estar medindo', kelvin, 'K' )

let celsius = 80
let fahrenheit2 = celsius * 9 / 5 + 32

console.log('Se o termometro de unidade Celsius está medindo', celsius,'°C', 'então o termometro de unidade Fahrenheit deve estar medindo', fahrenheit2, '°F' )
let celsius2 = 30
let fahrenheit3 = celsius2 * 9 / 5 + 32
let kelvin2 = (fahrenheit3 - 32)*(5/9) + 273.15

console.log('Se o termometro de unidade Celsius está medindo', celsius2,'°C', 'então o termometro de unidade Fahrenheit deve estar medindo', fahrenheit3, '°F e', kelvin2, 'K')
let userCelcius = prompt('Insira a temperetura em °C')
let userFahrenheit = userCelcius * 9 / 5 + 32
let userKelvin = (userFahrenheit - 32)*(5/9) + 273.15
console.log('A temperatura que você digitou em °C equivale à', userFahrenheit, '°F e', userKelvin, 'K' )