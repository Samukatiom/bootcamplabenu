// exercício 03

enum GENRE {
	ACAO="ação",
	DRAMA="drama",
	COMEDIA="comédia",
	ROMANCE="romance",
	TERROR="terror"
}

type Information = {
    nome: string,
    anoLancamento: number,
    genero: GENRE,
    pontuacao?: number
}

const movieData = (name: string, launch: number, genre:GENRE, score?:number):Information => {
    if(score) {
        return {
            nome: name,
            anoLancamento: launch,
            genero:genre,
            pontuacao: score
        }
    } else {
        return {
            nome: name,
            anoLancamento: launch,
            genero:genre
        }
    }
}

console.log(movieData("Harry Potter", 2005, GENRE.ACAO))