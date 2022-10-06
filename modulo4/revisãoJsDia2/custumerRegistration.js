let custumers = [
    { id: 1, nome: "Fulano" },
	{ id: 2, nome: "Ciclano" },
	{ id: 3, nome: "Beltrano" },
	{ id: 4, nome: "Fulana" }
]
let id = []

const mapId = custumers.map((custumer)=> {
	id = [...id , custumer.id]
})


const addCustumers = (teste, name) => {
	const valid = id.includes(teste)
	if(valid) {
		return "Este id já existe"
	}
	else {
		custumers = [...custumers, {id: teste, nome: name}]

		return custumers

	}
}



console.log(addCustumers(5, "Samuel"))

//estou com o seguinte problema: Consigo cadastrar apenas um cliente... HELP!! Chama no slack kkkk