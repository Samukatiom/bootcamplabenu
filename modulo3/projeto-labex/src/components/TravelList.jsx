import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL, user } from "../constants/url"
import { navigateToDetailsPage } from "../routes/coordinator"

function TravelList(props) {
    const [travelList, setTravelList] = useState(undefined)

    const navigate = useNavigate() 
    useEffect(() => {
        getTrips()
    }, [])

    const getTrips = () => {
        axios.get(`${BASE_URL}/${user}/trips`)
            .then((response) => {
                setTravelList(response.data.trips)
                console.log(travelList)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const deleteTrip = (id) => {
        const header = {

            headers: {
                "auth": localStorage.getItem("token")
            }
        }

        if(confirm("Tem certeza que deseja excluir essa viagem?"))
        {axios.delete(`${BASE_URL}/${user}/trips/${id}`, header)
            .then(()=>{
                getTrips()
            })
            .catch((error)=>{
                console.error(error.response)
            })}
    }

    const cardTravel = travelList && travelList.map((travel) => {
        return (
            <div key={travel.id}>
                <p> Nome: {travel.name} </p>
                <p> Descrição: {travel.description} </p>
                <p> Planeta: {travel.planet} </p>
                <p> Duração: {travel.durationInDays} </p>
                <p> Data: {travel.date} </p>
                {
                props.currentPage === "adminPage"
                && <nav>
                    <button onClick={() => {navigateToDetailsPage(navigate)}}>Exibir detalhes</button>
                    <button onClick={()=> {deleteTrip(travel.id)}}>Excluir viagem</button>
                </nav>
                }
                <hr />
            </div>
        )
    })

    return (
        <div>
            <h2>Lista de Viagens</h2>
            {cardTravel}
        </div>

    )

}

export default TravelList