import axios from "axios";
import { createContext, useState } from "react";
import { getters, setters, states } from "../models/context";
import { BASE_URL } from "../Constants/url";
import { outputGetContests, outputGetGames, outputGetGamesContests } from "../models/games";

export const GlobalContext = createContext({ states: {} as states, setters: {} as setters, getters: {} as getters });

export default function GlobalState(props: any) {
    const [games, setGames] = useState<outputGetGames[]>([])
    const [gamesContests, setGamesContests] = useState<outputGetGamesContests[]>([])
    const [contests, setContests] = useState<outputGetContests>({
        id: "",
        loteria: 0,
        numeros: [],
        data: ""
    })
    const [gameId, setGameId] = useState(0)
    const [contestId, setContestId] = useState("2359")

    const getGames = async () => {
        await axios.get(`${BASE_URL}/loterias`)
            .then((res) => setGames(res.data))
            .catch((err) => console.log(err))
    }

    const getGamesContests = async () => {

        await axios.get(`${BASE_URL}/loterias-concursos`)
            .then((res) => setGamesContests(res.data))
            .catch((err) => console.log(err))
    }

    const getContentsById = async () => {
        gamesContests.filter((game: outputGetGamesContests) => {
            return game.loteriaId === Number(gameId)
        })
            .map((game: outputGetGamesContests) => {
                setContestId(game.concursoId)
            })
        await axios.get(`${BASE_URL}/concursos/${contestId}`)
            .then((res) => setContests(res.data))
            .catch((err) => console.log(err))
    }

    const states: states = {
        games,
        gamesContests,
        contests,
        gameId,
        contestId
    }

    const setters: setters = {
        setGames,
        setGamesContests,
        setContests,
        setGameId,
        setContestId
    }

    const getters: getters = {
        getGames,
        getGamesContests,
        getContentsById
    }

    const context = { states, setters, getters }

    return (
        <GlobalContext.Provider value={context}>
            {props.children}
        </GlobalContext.Provider>
    )
}
