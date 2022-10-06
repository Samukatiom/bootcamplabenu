import { useNavigate } from "react-router-dom"
import { navigateToAdminPage } from "../routes/coordinator"


function DetailsPage (){

    const navigate = useNavigate()
    return(
        <div>
            <button onClick={()=>{ navigateToAdminPage(navigate) }}>Sair de detalhes</button>
        <h2>Viagem: Teste</h2>
        <hr />
        <h3>Lista de candidatos</h3>
        <hr />
        <h3>Lista de candidatos aprovados</h3>
        </div>
        
    )
}

export default DetailsPage