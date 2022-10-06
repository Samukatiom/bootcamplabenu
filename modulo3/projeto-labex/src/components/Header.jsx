import {useNavigate} from "react-router-dom"
import { navigateToAdminPage, navigateToHome } from "../routes/coordinator"
import Login from "./Login"

function Header (props){
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigateToHome(navigate)
    }
    return(
        <header>
            <h1>LabeX</h1>
            <nav>
                {props.currentPage === "homePage"
                ?<Login />
                :<button onClick={() => logout()}>Logout</button>}
            </nav>
        </header>
    )
}
export default Header