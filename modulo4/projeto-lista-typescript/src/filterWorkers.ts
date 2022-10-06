enum SECTORS {
    MARKETING = "marketing",
    SALES = "vendas",
    FINANCIAL = "financeiro",
}

type Workers = {
    nome: string,
    salario: number,
    setor: SECTORS,
    presencial: boolean
}


const employees : Workers[] =[
	{ nome: "Marcos", salario: 2500, setor: SECTORS.MARKETING, presencial: true },
	{ nome: "Maria" ,salario: 1500, setor: SECTORS.SALES, presencial: false},
	{ nome: "Salete" ,salario: 2200, setor: SECTORS.FINANCIAL, presencial: true},
	{ nome: "João" ,salario: 2800, setor: SECTORS.MARKETING, presencial: false},
	{ nome: "Josué" ,salario: 5500, setor: SECTORS.FINANCIAL, presencial: true},
	{ nome: "Natalia" ,salario: 4700, setor: SECTORS.SALES, presencial: true},
	{ nome: "Paola" ,salario: 3500, setor: SECTORS.MARKETING, presencial: true }
]



const filterWorkers = (employees : Workers[]) : Workers[]  => {
    const listFilter: Workers[] = employees.filter((employee : Workers) => {
        const firstCondition = employee.setor === SECTORS.MARKETING
        const secondCondition = employee.presencial === true

        return firstCondition && secondCondition
    })
    
    return listFilter
}

console.log(filterWorkers(employees))