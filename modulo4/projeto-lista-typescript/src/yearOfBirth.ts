//exercício 02

const yearOfBirth = (name: string, date: string): string => {
    const day: string = date.substring(0, 2)
    const month: number = Number(date.substring(3, 5))
    const year: string = date.substring(6, 10)

    const months:string[] = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
      ]

    return `Olá, me chamo ${name}, nasci no dia ${day}, no mês de ${months[month - 1]} e ano de ${year}.`
}

console.log(yearOfBirth("Samuel", "03/02/1999"))