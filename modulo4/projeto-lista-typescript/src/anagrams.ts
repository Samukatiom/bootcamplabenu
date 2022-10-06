const anagrams = (word : string) : number => {
    const numberOfLetters : number = word.length

    let output  : number = numberOfLetters

    for (let i = 1 ; i < numberOfLetters; i++ ){
        output *= i
    }

    return output
}

console.log(anagrams("comida"))