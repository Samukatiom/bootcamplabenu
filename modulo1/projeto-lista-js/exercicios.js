// EXEMPLOS DE IMPLEMENTAÇÃO ---------------------------------------------------------------

// EXERCÍCIO 0A
function soma(num1, num2) {
  // implemente sua lógica aqui
  return num1 + num2
}

// EXERCÍCIO 0B
function imprimeMensagem() {
  // implemente sua lógica aqui
  const mensagem = prompt('Digite uma mensagem!')

  console.log(mensagem)
}

// EXERCÍCIOS PARA FAZER ------------------------------------------------------------------

// EXERCÍCIO 01
function calculaAreaRetangulo() {
  const a = prompt('Digite a altura do retangulo!')
  const l = prompt('Digte agora a largura!')
  const s = a * l 
  console.log(s)
}

// EXERCÍCIO 02
function imprimeIdade() {
  const anoAtual = Number(prompt('Digite por favor o ano atual!'))
  const anoNascimento = Number(prompt('Agora digite o ano do seu nascimento'))
  const idade = anoAtual - anoNascimento
  console.log(idade)
}

// EXERCÍCIO 03
function calculaIMC(peso, altura) {
  const imc = peso / (altura * altura)
  return imc
}

// EXERCÍCIO 04
function imprimeInformacoesUsuario() {
  const nome = prompt('Olá, tudo bem? Qual é seu nome?')
  const idade = prompt('Qual é sua idade?')
  const email = prompt('Qual é seu email?')
  console.log(`Meu nome é ${nome}, tenho ${idade} anos, e o meu email é ${email}.`) 
}

// EXERCÍCIO 05
function imprimeTresCoresFavoritas() {
  const cor1 = prompt('Olá, digite sua primeira cor favorita!')
  const cor2 = prompt('Agora digite sua segunda cor favorita!')
  const cor3 = prompt('E para finalizarmos, digite a sua terceira cor favorita!')
  const coresFavoritas = [cor1, cor2, cor3]
  console.log(coresFavoritas)
}

// EXERCÍCIO 06
function retornaStringEmMaiuscula(string) {
  return string.toUpperCase()
}

// EXERCÍCIO 07
function calculaIngressosEspetaculo(custo, valorIngresso) {
  const quantidade = custo / valorIngresso
  return quantidade
}

// EXERCÍCIO 08
function checaStringsMesmoTamanho(string1, string2) {
  const tamanho1 = string1.length
  const tamanho2 = string2.length
  return tamanho1 === tamanho2
}

// EXERCÍCIO 09
function retornaPrimeiroElemento(array) {
  const primeiroElemento = array.shift()
  return primeiroElemento
}

// EXERCÍCIO 10
function retornaUltimoElemento(array) {
  const ultimoElemento = array.pop()
  return ultimoElemento
}

// EXERCÍCIO 11
function trocaPrimeiroEUltimo(array) {

}


// EXERCÍCIO 12
function checaIgualdadeDesconsiderandoCase(string1, string2) {
  return string1.toUpperCase() === string2.toUpperCase()

}

// EXERCÍCIO 13
function checaRenovacaoRG() {
  // const anoDeNascimento = Number(prompt('Olá, você nasceu em que ano?'))
  // const anoDaId = Number(prompt('Em que ano foi emitida a sua carteira de identidade?'))


}

// EXERCÍCIO 14
function checaAnoBissexto(ano) {
  // implemente sua lógica aqui

}

// EXERCÍCIO 15
function checaValidadeInscricaoLabenu() {
  // implemente sua lógica aqui

}