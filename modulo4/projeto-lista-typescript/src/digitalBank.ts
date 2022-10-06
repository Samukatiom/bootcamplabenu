type Custumers = {
    cliente : string,
    saldoTotal: number,
    debitos: number[]
}

let bankCustumers: Custumers[] =  [
	{ cliente: "João", saldoTotal: 1000, debitos: [100, 200, 300] },
	{ cliente: "Paula", saldoTotal: 7500, debitos: [200, 1040] },
	{ cliente: "Pedro", saldoTotal: 10000, debitos: [5140, 6100, 100, 2000] },
	{ cliente: "Luciano", saldoTotal: 100, debitos: [100, 200, 1700] },
	{ cliente: "Artur", saldoTotal: 1800, debitos: [200, 300] },
	{ cliente: "Soter", saldoTotal: 1200, debitos: [] }
]

const negativeBalance = (custumers: Custumers[]):Custumers[]=> {
    const reduceBalance = custumers.map((custumer: Custumers)=> {
        const balanceSum: number = custumer.debitos.reduce((balanceSum, total ) => balanceSum + total, 0)

        const updateBalance: Custumers = {
            cliente: custumer.cliente,
            saldoTotal: custumer.saldoTotal - balanceSum,
            debitos: []
        }

        return updateBalance
    })
    const filterNegative = reduceBalance.filter((custumer: Custumers) => {
        const condition = custumer.saldoTotal < 0

        return condition
    })
    return filterNegative
}

console.log(negativeBalance(bankCustumers))