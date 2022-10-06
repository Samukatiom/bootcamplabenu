//Exercícios de interpretação de código
//-----------------------01-----------------------

// const respostaDoUsuario = prompt("Digite o número que você quer testar")
// const numero = Number(respostaDoUsuario)

// if (numero % 2 === 0) {
//   console.log("Passou no teste.")
// } else {
//   console.log("Não passou no teste.")
// }
    // a. O código pede ao usuário um número e então tranforma a resposta para number. Com o a resposta do usuário já como number é feito uma condição(Se o número for divisivel por 
    //2(número par) imprima no console 'Passou no teste', se não imprima no console 'Não passou no teste')
    
    // b. Números pares
    // c. Todos os números que não são pares

//-----------------------02-----------------------

// let fruta = prompt("Escolha uma fruta")
// let preco
// switch (fruta) {
//   case "Laranja":
//     preco = 3.5
//     break;
//   case "Maçã":
//     preco = 2.25
//     break;
//   case "Uva":
//     preco = 0.30
//     break;
//   case "Pêra":
//     preco = 5.5
//     break; // BREAK PARA O ITEM c.
//   default:
//     preco = 5
//     break;
// }
// console.log("O preço da fruta ", fruta, " é ", "R$ ", preco)
    // a. O código serva para o seguinte: quando o usuário digita o nome da, e devolvido no console o nome e preço de acordo com a condição
    // b. 'O preço da fruta Maçã é , R$ 2.25'
    // c. 'O preço da fruta Pêra é , R$ 5'

//-----------------------03-----------------------

// const numero = Number(prompt("Digite o primeiro número."))

// if(numero > 0) {
//   console.log("Esse número passou no teste")
// 	let mensagem = "Essa mensagem é secreta!!!"
// }

// console.log(mensagem)
    // a. Criando uma variável que será ocupada por um prompt que será tranformada em number
    // b. (10)'Esse número passou no teste' ; (-10) 'Udefined'
    // c. Haverá um eero pois o a variavel mensagem não está no escopo global

//Exercícios de escrita de código

//-----------------------01-----------------------

// a. b.
    const idadeUsuario = Number(prompt('Olá, quantos anos você tem?'))

    // c.
if(idadeUsuario >= 18){
    console.log('Você pode dirigir')
}else{
    console.log('Você não pode dirigir')
}

//-----------------------02-----------------------

const turnoUsuario = prompt('Olá aluno, em qual turno você estuda? (M - para matutino; V - para vespertino; N - para noturno.)')
if(turnoUsuario === 'M'){
    console.log('Bom dia!')
} else if(turnoUsuario === 'V'){
    console.log('Boa tarde!')
} else if(turnoUsuario === 'N'){
    console.log('Boa noite!')
}else{
    console.log('Ops, comando não encontrado, tente novamente.') //extra
}

//-----------------------03-----------------------

switch(turnoUsuario){
    case 'M':
        console.log('Bom dia!')
        break
    case 'V':
        console.log('Boa tarde!')
        break
    case 'N':
        console.log('Boa noite!')
        break
    default:
        console.log('Ops, comando não encontrado, tente novamente.') //extra
}

//-----------------------04----------------------- -----------------------Desafio 01-----------------------

const generoDoFilme = prompt('Oi, qual é gênero do filme que você gostaria de assistir?')
const generoDoFilme100Espaco = generoDoFilme.trim()
const generoDoFilmeMinusculo = generoDoFilme100Espaco.toLocaleLowerCase()
const precoIngresso = Number(prompt('Quanto custa o ingresso em reais?'))
const lanchinho = prompt('Qual lanchinho você vai comprar?')
if(generoDoFilmeMinusculo === "fantasia" && precoIngresso < 15){
    console.log('Bom filme!')
    console.log(`Aproveite o seu ${lanchinho}`) //desafio
}else{
    console.log('Escolha outro filme.')
}

//-----------------------Desafio 02-----------------------

const nomeCompleto = prompt('Por favor, digite seu nome completo.')
const tipoDeJogo = prompt('Qula é o tipo de jogo? Por favor digite IN(se for internacional) ou DO(se for doméstico)')
const etapaDoJogo = prompt('Qual é a etapa do jogo? (por favor complete com: SF(para semi-final), DT(para decisão de terceiro lugar) e FI(para final)')
const categoria = Number(prompt('Qual é a categoria, 1,2,3 ou 4 ?'))
const quantidadeDeIngressos = Number(prompt('E para finalizar digite a quantidade de ingresso.'))
console.log('---Dados da compra---')
console.log(`Nome do cliente: ${nomeCompleto}`)
if(tipoDeJogo === 'IN'){
    console.log('Tipo de jogo: Internacional')
}else if(tipoDeJogo === 'DO'){
    console.log('Tipo de jogo: Nacional')
}
switch(etapaDoJogo){
    case 'SF':
        console.log('Etapa do jogo: Semi-Final')
        break
    case 'DT':
        console.log('Etapa do jogo: Decisão de terceiiro lugar')
        break
    case 'FI':
        console.log('Etapa do jogo: Final')
        break
}
console.log(`Categoria: ${categoria}`)
console.log(`Quantidade de ingressos: ${quantidadeDeIngressos} ingressos`)
console.log('---Valores---')
if(tipoDeJogo === 'DO' && etapaDoJogo === 'SF' && categoria === 1) {
    console.log(`Valor do ingresso: R$ 1.320`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 1320}`)
} else if(tipoDeJogo === 'DO' && etapaDoJogo === 'SF' && categoria === 2) {
    console.log(`Valor do ingresso: R$ 880 `)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 880}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'SF' && categoria === 3) {
    console.log(`Valor do ingresso: R$ 550`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 550}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'SF' && categoria === 4) {
    console.log(`Valor do ingresso: R$ 220`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 220}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'DT' && categoria === 1) {
    console.log(`Valor do ingresso: R$ 660`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 660}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'DT' && categoria === 2) {
    console.log(`Valor do ingresso: R$ 440`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 440}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'DT' && categoria === 3) {
    console.log(`Valor do ingresso: R$ 330`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 330}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'DT' && categoria === 4) {
    console.log(`Valor do ingresso: R$ 170`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 170}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'FI' && categoria === 1) {
    console.log(`Valor do ingresso: R$ 1980`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 1980}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'FI' && categoria === 2) {
    console.log(`Valor do ingresso: R$ 1320`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 1320}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'FI' && categoria === 3) {
    console.log(`Valor do ingresso: R$ 880`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 880}`)
}else if(tipoDeJogo === 'DO' && etapaDoJogo === 'FI' && categoria === 4) {
    console.log(`Valor do ingresso: R$ 330`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 330}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'SF' && categoria === 1) {
    console.log(`Valor do ingresso: R$ ${1.320 * 4.10} `)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 1320 * 4.10}`)
} else if(tipoDeJogo === 'IN' && etapaDoJogo === 'SF' && categoria === 2) {
    console.log(`Valor do ingresso: R$ ${880 * 4.10} `)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 880 * 4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'SF' && categoria === 3) {
    console.log(`Valor do ingresso: R$ ${550 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 550 * 4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'SF' && categoria === 4) {
    console.log(`Valor do ingresso: R$ ${220 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 220 * 4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'DT' && categoria === 1) {
    console.log(`Valor do ingresso: R$ ${660 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 660 * 4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'DT' && categoria === 2) {
    console.log(`Valor do ingresso: R$ ${440 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 440 * 4.10 }`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'DT' && categoria === 3) {
    console.log(`Valor do ingresso: R$ ${330 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 330 * 4.40}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'DT' && categoria === 4) {
    console.log(`Valor do ingresso: R$ ${170 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 170 * 4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'FI' && categoria === 1) {
    console.log(`Valor do ingresso: R$ ${1980 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 1980 * 4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'FI' && categoria === 2) {
    console.log(`Valor do ingresso: R$ ${1320 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 1320 *4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'FI' && categoria === 3) {
    console.log(`Valor do ingresso: R$ ${880 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 880 * 4.10}`)
}else if(tipoDeJogo === 'IN' && etapaDoJogo === 'FI' && categoria === 4) {
    console.log(`Valor do ingresso: R$ ${330 * 4.10}`)
    console.log(`Valor total: R$ ${quantidadeDeIngressos * 330 * 4.10}`)
}

