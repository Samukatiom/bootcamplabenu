//Exercícios de interpretação de código
//-----------------01-----------------

// const filme = {
// 	nome: "Auto da Compadecida", 
// 	ano: 2000, 
// 	elenco: [
// 		"Matheus Nachtergaele", "Selton Mello", "Denise Fraga", 
// 		"Virginia Cavendish"
// 		], 
// 	transmissoesHoje: [
// 		{canal: "Telecine", horario: "21h"}, 
// 		{canal: "Canal Brasil", horario: "19h"}, 
// 		{canal: "Globo", horario: "14h"}
// 		]
// }

// console.log(filme.elenco[0])
// console.log(filme.elenco[filme.elenco.length - 1])
// console.log(filme.transmissoesHoje[2])
    // a.
    /*Matheus Nachtergaele
    Virginia Cavendish
    {Canal: 'Globo', Horario: '14h'}
    */

//-----------------02-----------------

// const cachorro = {
// 	nome: "Juca", 
// 	idade: 3, 
// 	raca: "SRD"
// }

// const gato = {...cachorro, nome: "Juba"}

// const tartaruga = {...gato, nome: gato.nome.replaceAll("a", "o")}

// console.log(cachorro)
// console.log(gato)
// console.log(tartaruga)
    // a.
    /*{nome: 'Juca', idade: 3, raca : 'SRD'}
    {nome: 'Juba', idade: 3, raca : 'SRD' }
    {nome: 'Jubo', idade: 3, raca ; 'SRD'}*/
    // b.
    //Copia um objeto ou uma array por inteira e nos permite manipular da maneira que quisremos

//-----------------03-----------------

// function minhaFuncao(objeto, propriedade) {
// 	return objeto[propriedade]
// }

// const pessoa = {
//   nome: "Caio", 
//   idade: 23, 
//   backender: false
// }

// console.log(minhaFuncao(pessoa, "backender"))
// console.log(minhaFuncao(pessoa, "altura"))
    // a.
    /* false
    undefined*/
    // b. No primeiro console é impresso 'false', pois é o valor do backender. Já no segundo no console é 'undefined' pois não nada dentro do objeto com o valor 'altura'

//Exercícios de escrita de código

//-----------------01-----------------

    // a.

const pessoa = {
    nome: 'Samuel',
    apelidos: ['Samuca', 'Samukatiom', 'Samu']
}
function meChameDe(objeto){
  const comoMeChamar = `Eu sou ${objeto.nome}, mas pode me chamar de: ${objeto.apelidos[0]}, ${objeto.apelidos[1]} ou ${objeto.apelidos[2]}.`
  console.log(comoMeChamar)  
}
meChameDe(pessoa)

    //b.
const novoApelido = {
    ...pessoa,
    apelidos: ['Muel', 'Bigode', 'Código de barras'] 
}
meChameDe(novoApelido)

//-----------------02-----------------

    // a.
const humano1 = {
    nome: 'Godofredo',
    idade: 48,
    profissao: 'Militar'
}

const humano2 = {
    nome: 'Gertudes',
    idade: 27,
    profissao: 'Professora'
}
    // b.
function retorneArray(objt){
    const nomeDoHumano = objt.nome
    const caractereNome = objt.nome.length
    const idadeHumano = objt.idade
    const profissaoHumano = objt.profissao
    const caractereProfissao = objt.profissao.length
    const listaHumano = [nomeDoHumano, caractereNome, idadeHumano, profissaoHumano, caractereProfissao]
    return listaHumano
}
//-----------------03-----------------

    // a.
let carrinho = []
    // b.
const fruta1 = {
    nomeDaFruta: 'banana',
    disponibilidade: true
}
const fruta2 = {
    nomeDaFruta: 'morango',
    disponibilidade: false
}
const fruta3 = {
    nomeDaFruta: 'goiaba',
    disponibilidade: true
}
    // c.
function colocaDentroDoCarrinho(objetoFruta){
    carrinho.push(objetoFruta)
}
colocaDentroDoCarrinho(fruta1)
colocaDentroDoCarrinho(fruta2)
colocaDentroDoCarrinho(fruta3)
    // d.
console.log(carrinho)

//-----------------Desafios-----------------
    // 1.
function usuario(){
    const nomeDoUsuario = prompt('Olá, qual é seu nome?')
    const idadeDoUsuario = prompt('Quantos anos você tem')
    const profissaoUsuario = prompt('Qual é sua profissão?')
    const objtUsuario = {
        nome: nomeDoUsuario,
        idade: idadeDoUsuario,
        profissao: profissaoUsuario
    }
    console.log(objtUsuario)
    console.log(typeof objtUsuario)
}
usuario()

    // 2.
function filmes(){
    const filme1 = {
        lancamentoFilme: 2002,
        nomeDoFilme: 'Homem-Aranha'
        }
    const filme2 = {
        lancamentoFilme: 2010,
        nomeDoFilme: 'Alice no País das Maravilhas'
    }
    const lancadoAntes = filme1.lancamentoFilme < filme2.lancamentoFilme
    const mesmoAno = filme1.lancamentoFilme === filme2.lancamentoFilme
    console.log(`O ${filme1.nomeDoFilme} foi lançado antes do ${filme2.nomeDoFilme}? ${lancadoAntes}`)
    console.log(`O ${filme1.nomeDoFilme} foi lançado no mesmo ano do ${filme2.nomeDoFilme}? ${mesmoAno}`)
}
filmes()

    // 3.

function sacolaoExtra(esqueFruta) {
    const estoqueInvertido = !esqueFruta.disponibilidade
    console.log(estoqueInvertido)
}
sacolaoExtra(fruta1)
sacolaoExtra(fruta2)
sacolaoExtra(fruta3)