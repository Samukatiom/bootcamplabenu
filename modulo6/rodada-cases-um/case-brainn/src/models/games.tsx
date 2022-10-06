export interface outputGetGames {
    id: number,
    nome: string
}

export interface outputGetGamesContests  {
    loteriaId: number,
    concursoId: string
}

export interface outputGetContests {
    id: string,
    loteria: number,
    numeros: string[],
    data: string
}