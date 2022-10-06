import { useContext } from "react"
import { GlobalContext } from "../../Global/GlobalState"
import { ListNumber } from "./style"

export default function NumberList() {
    const context = useContext(GlobalContext)
    const { contests } = context.states
    return (
        <ListNumber>
            {contests.numeros.map((numero: string) => {
                return <li>{numero}</li>
            })}
        </ListNumber>
    )
}