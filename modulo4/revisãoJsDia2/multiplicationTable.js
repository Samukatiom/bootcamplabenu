const multiplicationTable = (number) => {
    let multiplier = 0
    let tab = []
    while (multiplier <= 10) {
        tab = [...tab, `${number} x ${multiplier} = ${number*multiplier}`]
        multiplier++
    }
    return tab
}

console.log(multiplicationTable(10))