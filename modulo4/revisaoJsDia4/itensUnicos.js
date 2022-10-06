const primeiraLista = [
	{
		nome: "Banana"
	},
	{
		nome: "Laranja"
	}
]

const segundaLista= [
	{
		nome: "Laranja"
	},
	{
		nome: "Cebola"
	}
]


const itensUnicos = (list1, list2) => {
    const listConcatenada = list1.concat(list2) 

    const output = []

    for( let itemConcatenado of listConcatenada) { 
        const itemOutput = output.find((item) => item.nome === itemConcatenado.nome)

        if(!itemOutput) {
            output.push(itemConcatenado)
        }
    } 

    return output
    
}

console.log(itensUnicos(primeiraLista, segundaLista))
