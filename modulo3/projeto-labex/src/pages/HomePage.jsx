import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import TravelList from "../components/TravelList"
import { BASE_URL, user } from "../constants/url"
import listCountries from "../constants/countries.json"

function HomePage() {
    const [travelList, setTravelList] = useState(undefined)
    const [travel, setTravel] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState(null)
    const [applicationText, setApplicationText] = useState("")
    const [occupation, setOccupation] = useState("")
    const [coutrie, setCoutrie] = useState("")

    const countries = listCountries //estou usando um arquivo json desde repositório para buscar todos os nomes dos países: "https://github.com/juliolvfilho/lista-paises"
    useEffect(()=>{
        getTrips()
    },[])

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
    const applyToTrip = () => {
        const url = `${BASE_URL}/${user}/trips/${travel}/apply`
        const body = {
            "name": name,
            "age": Number(age),
            "applicationText": applicationText,
            "profession": occupation,
            "country" : coutrie
        }
        // console.log(body)
        axios.post(url, body)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    const handleTravel = (event) => {
        setTravel(event.target.value)
    }
    const handleName = (event) =>{
        setName(event.target.value)
    }
    const handleAge = (event) =>{
        setAge(event.target.value)
    }
    const handleApplicationText = (event) =>{
        setApplicationText(event.target.value)
    }
    const handleOccupation =(event) =>{
        setOccupation(event.target.value)
    }
    const handleCoutrie = (event) =>{
        setCoutrie(event.target.value)
    }
    const optionsTravel = travelList && travelList.map((travel) => {
        return (
            <option value={travel.id}>{travel.name}</option>
        )
    })
    const optionsCountries = countries && countries.map((countrie) =>{
        return <option value={countrie.nome}>{countrie.nome}</option>
    })
    return (
        <div>
            <Header currentPage={"homePage"} />
            <hr />
            <section>
                <h2>Inscreva-se uma nova viagem!</h2>
                <label htmlFor="travel">Viagem:</label>
                <select
                    value={travel}
                    onChange={handleTravel}
                    name="select"
                    id="travel"
                >
                    <option value="" disabled selected>Escolha uma viagem...</option>
                    {optionsTravel}

                </select>

                <label htmlFor="name">Nome:</label>
                <input
                    value={name}
                    onChange={handleName}
                    id="name"
                    type="text"
                />

                <label htmlFor="age">Idade:</label>
                <input
                    value={age}
                    onChange={handleAge}
                    id="age"
                    type="number"
                />

                <label htmlFor="application-text">Texto de Candidatura:</label>
                <textarea
                    value={applicationText}
                    onChange={handleApplicationText}
                    name="text-area"
                    id="application-text"
                    cols="30"
                    rows="10"
                />

                <label htmlFor="occupation">Profissão</label>
                <input
                    value={occupation}
                    onChange={handleOccupation}
                    id="occupation"
                    type="text"
                />

                <label htmlFor="coutrie">País de origem:</label>
                <select
                    value={coutrie}
                    onChange={handleCoutrie}
                    name="select-coutrie"
                    id="coutrie"
                >
                    <option defaultValue>Escolha um país...</option>
                    {optionsCountries}
                </select>

                <button onClick={()=>{applyToTrip()}}>Enviar candidatura</button>
            </section>
            <hr />
            <TravelList currentPage={"homePage"} />
        </div>
    )

}
export default HomePage