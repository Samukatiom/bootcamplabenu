import { outputGetContests, outputGetGames, outputGetGamesContests } from "./games";

export interface states {
    games: outputGetGames[],
    gamesContests: outputGetGamesContests[],
    contests: outputGetContests,
    gameId: number,
    contestId: string
}

export interface setters {
    setGames: React.Dispatch<React.SetStateAction<outputGetGames[]>>,
    setGamesContests: React.Dispatch<React.SetStateAction<outputGetGamesContests[]>>,
    setContests: React.Dispatch<React.SetStateAction<outputGetContests>>,
    setGameId: React.Dispatch<React.SetStateAction<number>>,
    setContestId: React.Dispatch<React.SetStateAction<string>>
}

export interface getters {
    getGames: () => Promise<void>,
    getGamesContests: () => Promise<void>,
    getContentsById: () => Promise<void>
}

export interface IContext { states: states, setters: setters, getters: getters }