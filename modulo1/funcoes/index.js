//Exercícios de interpretação de código

//-----------01-----------

// function minhaFuncao(variavel) {
// 	return variavel * 5
// }

// console.log(minhaFuncao(2))
// console.log(minhaFuncao(10)) 
/*
Respostas: será impresso no console: 
10
50
Se for retirado os dois console.log e substituído por minhaFuncao, não será impresso nada
no terminal.
*/

//-----------02-----------

// let textoDoUsuario = prompt("Insira um texto");

// const outraFuncao = function(texto) {
// 	return texto.toLowerCase().includes("cenoura")
// }

// const resposta = outraFuncao(textoDoUsuario)
// console.log(resposta)

/*
a. A função pega uma string e deixa tudo minúsculo, e verifica se na string há a palavra 
"cenoura"
b.
    i.True
    ii. True
    iii. False
*/

//Exercícios de escrita de código

//-----------01-----------
    // a.
function souEU(){
 console.log('Eu sou Samuel, tenho 23 anos, moro em Curitiba e sou estudante.')   
}
souEU()
    // b.
function infoPessoa(nome, idade, cidade, profissao){
    const frase = `Eu sou ${nome}, tenho ${idade} anos, moro em ${cidade} e sou ${profissao}`
    return frase
}
console.log(infoPessoa('Juliana', 42, 'Rio de Janeiro', 'Mecanica'))

//-----------02-----------

    // a.
function receba2Numeros(num1, num2){
    const soma = num1 + num2
    return soma
}
receba2Numeros()
console.log(receba2Numeros(40, 60))

    // b.
function doisNumBool(nb1, nb2){
    const resultBool = nb1 >= nb2
    return resultBool
}
doisNumBool()
console.log(doisNumBool(10,10))

    // c.
function ePar(num){
    const div2 = num % 2 === 0
    return div2
}
ePar()
console.log(ePar(70))

    // d.
function mensagem(texto){
    let maiuscula = texto.toUpperCase()
    let tamanho = texto.length
    console.log(maiuscula, tamanho)
}
mensagem('Olá pequeno gafanhoto!')

//-----------03-----------

function soma(n1, n2){
    return n1 + n2
}
function sub(n1, n2){
    return n1 - n2
}
function mult(n1, n2){
    return n1 * n2
}
function div(n1, n2){
    return n1 / n2 
} 
const numero1 = Number(prompt('Olá, digite um número'))
const numero2 = Number(prompt('Digite mais um número'))
const adi = soma(numero1, numero2)
const subt = sub(numero1, numero2)
const multp = mult(numero1, numero2)
const divi = div(numero1, numero2)
console.log(`Números escolhidos: ${numero1} e ${numero2}`)
console.log(`Soma: ${adi}`)
console.log(`Difirença: ${subt}`)
console.log(`Multiplicação: ${multp}`)
console.log(`Divisão: ${divi}`)