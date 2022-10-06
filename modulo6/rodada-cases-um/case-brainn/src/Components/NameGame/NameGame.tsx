import { useContext } from "react"
import logo from "../../Assets/img/logo.png"
import { GlobalContext } from "../../Global/GlobalState"
import { outputGetGames } from "../../models/games"
import { FigureGame } from "./style"

export default function NameGame() {
    const context = useContext(GlobalContext)
    const { games, gameId} = context.states
    return(
        <FigureGame>
            <img src={logo} alt="caixa-economica-federal" />
            {games.filter((game: outputGetGames) => {
                    return game.id === Number(gameId)
                }).map((game: outputGetGames) => {
                    return (
                        <h1 key={game.id}>{game.nome.toUpperCase()}</h1>
                    )
                })}
        </FigureGame>
    )
}