import { useContext, useEffect } from "react"
import NameGame from "../Components/NameGame/NameGame"
import NumberAndDateContests from "../Components/NumberAndDateContest/NumberAndDateContests"
import NumberList from "../Components/NumbersList/NumberList"
import SelectGame from "../Components/SelectGame/SelectGame"
import { changeColor } from "../Constants/functionUtils/changeColor"
import { GlobalContext } from "../Global/GlobalState"
import { FullStyle } from "./style"
export default function MainPage() {
    const context = useContext(GlobalContext)
    const { gameId, contestId } = context.states
    const { getGames, getGamesContests, getContentsById } = context.getters

    useEffect(() => {
        getGames()
    })

    useEffect(() => {
        getGamesContests()
    })

    useEffect(() => {
        getContentsById()
    }, [gameId, contestId])

    return (

        <FullStyle >
            <main id={changeColor(gameId)} className="full__sreen">
                <section id={changeColor(gameId)} className="section__color">
                    <SelectGame />
                        <NameGame />
                        <NumberAndDateContests />
                </section>
                <section className="section__light">
                    <NumberList />
                    <p className="p__end">Este sorteio é meramente ilustrativo e não possui nenhuma ligação com a CAIXA.</p>
                </section>
            </main>
        </FullStyle>

    )
}