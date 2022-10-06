// implementação da função

const convertsTemperature = (temperature, unit) => {
 
    if (typeof temperature !== "number") {
         return 'Ops, parece que você digitou o número de forma incorreta, lembre-se que ele deve ser digitado em algarismos e não por extensso'
    }

    else if (typeof unit !== "string"){
        return'Ops, parece que você digitou a unidade de forma incorreta, lembre-se que ela deve ser digitada da seguinte forma :"K" ou "F"'
    }

    else if(unit === 'K') {

        const output = `${temperature}° Celsius é equivalente a ${temperature + 273.15} Kelvin`
        
        return output
    }

    else if(unit === 'F') {

        const output = `${temperature}° Celsius é equivalente a ${9*temperature/5 + 32}° Farenheit`

        return output
    }

    else if (unit !== "F" || unit !== "K" ){
        return'Ops, parece que você digitou a unidade de forma incorreta, lembre-se que ela deve ser digitada da seguinte forma :"K" ou "F"'
    }
}

//área de testes

console.log(convertsTemperature(30, 'K'))
console.log(convertsTemperature(30, 'F'))
console.log(convertsTemperature(30, 'k'))
console.log(convertsTemperature(30, 'f'))
console.log(convertsTemperature("trinta", 'K'))
console.log(convertsTemperature(30, 'Kelvin'))
console.log(convertsTemperature(30))