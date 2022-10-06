// ATENÇÃO!!!
//    -> NÃO COMENTE NENHUMA DAS FUNÇÕES DECLARADAS!!! 
//    -> NÃO MODIFIQUE OS PARÂMETROS DAS FUNÇÕES!!! ()


// EXERCÍCIO 01
function retornaTamanhoArray(array) {
    const tamanhoArray = array.length
    return tamanhoArray
}

// EXERCÍCIO 02
function retornaArrayInvertido(array) {
    const arrayInvertido = array.reverse()
    return arrayInvertido
}

// EXERCÍCIO 03
function retornaArrayOrdenado(array) {
    const arrayOrdenada = array.sort((a, b) => {
        return a - b
    })
    return arrayOrdenada
}

// EXERCÍCIO 04
function retornaNumerosPares(array) {
    const apenasNumerosPares = array.filter((numero) => {
        return numero % 2 === 0
    })
    return apenasNumerosPares
}

// EXERCÍCIO 05
function retornaNumerosParesElevadosADois(array) {
    const apenasNumerosPares = array.filter((numero) => {
        return numero % 2 === 0})
    const arrayElevadosAoQuadrado = apenasNumerosPares.map((numero) =>{
        return numero ** 2
    })
    return arrayElevadosAoQuadrado
}

// EXERCÍCIO 06
function retornaMaiorNumero(array) {
    let maiorNumero = -Infinity
    
    for (let i = 0; i < array.length; i++){
        if (array[i] > maiorNumero) {
            maiorNumero = array[i]
        }
    }
    return maiorNumero
}

// EXERCÍCIO 07
function retornaObjetoEntreDoisNumeros(num1, num2) {
    let numbers = {}
    if (num1 > num2){
        numbers = {
            maiorNumero: num1,
            maiorDivisivelPorMenor: num1 % num2 === 0,
            diferenca: num1 - num2
        }
    }else if(num2 > num1) {
        numbers = {
            maiorNumero: num2,
            maiorDivisivelPorMenor: num2 % num1 === 0,
            diferenca: num2 - num1
        }
    
        
    }else if(num1 === num2){
        numbers = {
            maiorNumero: num1,
            maiorDivisivelPorMenor: num1 % num2 === 0,
            diferenca: num1 - num2
        }
    
        }return numbers
}

// EXERCÍCIO 08
function retornaNPrimeirosPares(n) {
    
}

// EXERCÍCIO 09
function classificaTriangulo(ladoA, ladoB, ladoC) {

}

// EXERCÍCIO 10
function retornaSegundoMaiorESegundoMenor(array) {
  
}

// EXERCÍCIO 11
function retornaChamadaDeFilme(filme) {
   
}

// EXERCÍCIO 12
function retornaPessoaAnonimizada(pessoa) {
   
}

// EXERCÍCIO 13A
function retornaPessoasAutorizadas(pessoas) {
   
}

// EXERCÍCIO 13B
function retornaPessoasNaoAutorizadas(pessoas) {
  
}

// EXERCÍCIO 14
function retornaContasComSaldoAtualizado(contas) {

}

// EXERCÍCIO 15A
function retornaArrayOrdenadoAlfabeticamente(consultas) {
  
}

// EXERCÍCIO 15B
function retornaArrayOrdenadoPorData(consultas) {
   
}