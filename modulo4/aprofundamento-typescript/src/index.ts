// exercicio 1

let ano: string = "2022"

// ano = 2022 -- não é possível usar namber aqui, pois a variavel foi tipada como string

// para podermos declarar como number e string podemos fazer o seguinte (irei criar uma nova variavel chamada "novoAno")

let novoAno: string | number = "2022"

novoAno = 2022

// exercicio 2

enum CoresArcoIris {
    VERMELHO = "Vermelho",
    LARANJA = "Laranja",
    AMARELO = "Amarelo",
    VERDE = "Verde",
    AZUL = "Azul",
    ANIL = "Anil",
    VIOLETA = "Violeta"
}

type Pessoa = {
    nome: string,
    idade: number,
    corFavorita: CoresArcoIris
}

const samuel : Pessoa = {
    nome: "Samuel",
    idade: 23,
    corFavorita: CoresArcoIris.AMARELO
}

