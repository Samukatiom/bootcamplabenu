//Exercícios de interpretação de código

//--------------------01--------------------

    // a. Será impresso no console todos os objetos do array, os indices e a array original
    
//--------------------02--------------------

    // a. Será impresso o seguinte array ['Amanda Rangel', 'Laís Petra', 'Letícia Chijo']
    
//--------------------03--------------------

    // a. Será impresso um novo array com dois objetos [{nome :'Amanda Rangel', apelido: 'Mandi'}, {nome: 'Laís Petra', apelido: 'Laura'}]

//Exercícios de escrita de código

//--------------------01--------------------
    
const pets = [
    { nome: "Lupin", raca: "Salsicha"},
    { nome: "Polly", raca: "Lhasa Apso"},
    { nome: "Madame", raca: "Poodle"},
    { nome: "Quentinho", raca: "Salsicha"},
    { nome: "Fluffy", raca: "Poodle"},
    { nome: "Caramelo", raca: "Vira-lata"},
 ]
    // a.
 const nomesDoguinhos = pets.map((pet) => {
     return pet.nome
 })
 console.log(nomesDoguinhos)
    // b.
const doguinhosSalsicha = pets.filter((pet) => {
    return pet.raca === 'Salsicha'
})
console.log(doguinhosSalsicha)
    // c.
const doguinhosPoodles = pets.filter((pet) => {
    return pet.raca === 'Poodle'
})
const mensagemDoguinhosPoodles = doguinhosPoodles.map((pet) => {
    pet.mensagem = 'Você ganhou um cupom de desconto de 10% para tosar o/a ' + pet.nome
    return pet
})
console.log(mensagemDoguinhosPoodles)

//--------------------02--------------------

const produtos = [
    { nome: "Alface Lavada", categoria: "Hortifruti", preco: 2.5 },
    { nome: "Guaraná 2l", categoria: "Bebidas", preco: 7.8 },
    { nome: "Veja Multiuso", categoria: "Limpeza", preco: 12.6 },
    { nome: "Dúzia de Banana", categoria: "Hortifruti", preco: 5.7 },
    { nome: "Leite", categoria: "Bebidas", preco: 2.99 },
    { nome: "Cândida", categoria: "Limpeza", preco: 3.30 },
    { nome: "Detergente Ypê", categoria: "Limpeza", preco: 2.2 },
    { nome: "Vinho Tinto", categoria: "Bebidas", preco: 55 },
    { nome: "Berinjela kg", categoria: "Hortifruti", preco: 8.99 },
    { nome: "Sabão em Pó Ypê", categoria: "Limpeza", preco: 10.80 }
 ]
    // a.
const nomeProdutos = produtos.map((produto) => {
    return produto.nome
})
console.log(nomeProdutos)
    // b.
const descontoProdutos = produtos.map((produto) => {
    produto.preco = produto.preco * 95 / 100
    delete produto.categoria
    return produto
})
console.log(descontoProdutos)
    // c.
    