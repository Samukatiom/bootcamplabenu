    // Abaixo realizei um type tipando todas as propriedades do objeto "estatisca", que será criado dentro da função.

type ObjNumParaEstatiscas = {
    maior: number
    menor: number
    media: number
}

    // A entrada desta função e do tipo array de numbers;

function obterEstatisticas(numeros: number[]): ObjNumParaEstatiscas {
        // Aqui temos uma variavel do tipo array de numbers;
    const numerosOrdenados:number[] = numeros.sort(
        (a, b) => a - b
    )
        // Aqui temos uma variavel do tipo number;
    let soma: number = 0

    for (let num of numeros) {
        soma += num
    }
        // Aqui temos uma variavel do tipo objeto que tipei na parte do superior do arquivo;
    const estatisticas: ObjNumParaEstatiscas = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }
        // O retorno será um objeto acima.
    return estatisticas
}

console.log(obterEstatisticas([1, 2, 3 , 5]))