/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */
console.log('Boas vindas ao jogo de Blackjack')

if(confirm('Quer iniciar uma nova rodada?')){
   const cartaUmUser = comprarCarta()
   const cartaDoisUser = comprarCarta()
   const cartaUmUsuario = cartaUmUser.texto
   const cartaDoisUsuario = cartaDoisUser.texto
   const pontuacaoCartaUsuario = cartaUmUser.valor + cartaDoisUser.valor
   const cartaValorUsuario = `Usuário - cartas: ${cartaUmUsuario} ${cartaDoisUsuario} - pontuação ${pontuacaoCartaUsuario}`
   console.log(cartaValorUsuario)
   const cartaUmComputer = comprarCarta()
   const cartaDoisComputer = comprarCarta()
   const cartaUmComputador = cartaUmComputer.texto
   const cartaDoisComputador = cartaDoisComputer.texto
   const pontuacaoCartaComputador = cartaUmComputer.valor + cartaDoisComputer.valor
   const cartaValorComputador = `Usuário - cartas: ${cartaUmComputador} ${cartaDoisComputador} - pontuação ${pontuacaoCartaComputador}`
   console.log(cartaValorComputador)
   if(pontuacaoCartaUsuario === pontuacaoCartaComputador){
      console.log('Empate')
   }else if(pontuacaoCartaUsuario > pontuacaoCartaComputador){
      console.log('O usuário ganhou!')
   }else if(pontuacaoCartaUsuario < pontuacaoCartaComputador){
      console.log('O computador ganhou!')
   }
}else{

 console.log('O jogo acabou.')  

}
