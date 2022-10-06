import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { navigateToHome } from "../routes/coordinator"
import TravelList from "../components/TravelList"
import { BASE_URL, user } from "../constants/url"


function AdminPage() {
    
    
    const [inputName, setInputName] = useState("")
    const [selecPlanet, setSelectPlanet] = useState("")
    const [inputDate, setInputDate] = useState("")
    const [textareaDescription, setTextareaDescription] = useState("")
    const [inputDuration, setInputDuration] = useState("")
    const [id, setId] = useState("")


    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const fromatDate = (date) => {
        const day = date.substring(8, 10)
        const month = date.substring(5, 7)
        const year = date.substring(0, 4)

        return `${day}/${month}/${year}`
    }

    const createTrip = () => {
        const url = `${BASE_URL}/${user}/trips`
        const header = {
            headers: {
                "auth": token
            }
        } 
        const body = {
            "name": inputName,
            "planet": selecPlanet,
            "date": fromatDate(inputDate),
            "description": textareaDescription,
            "durationInDays": Number(inputDuration) 
        }
        axios.post(url, body, header)
        .then(()=>{
            location.reload() // usei está função de atualizar a página provisoriamente.
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    const handleInputName = (event) => {
        setInputName(event.target.value)
    }

    const handleSelecPlanet = (event) => {
        setSelectPlanet(event.target.value)
    }

    const handleInputDate = (event) => {
        setInputDate(event.target.value)
    }

    const handleTextareaDescription = (event) => {
        setTextareaDescription(event.target.value)
    }

    const handleInputDuration = (event) => {
        setInputDuration(event.target.value)
    }

    useEffect(() => {
        if (!token) {
            navigateToHome(navigate)
        }
    }, [])

    return (
        <div>
            <Header currentPage={"adminPage"} />
            <hr />
            <h2>Crie uma nova viagem</h2>
            <section>
                <label htmlFor="name">Nome:</label>
                <input
                value = {inputName}
                onChange = {handleInputName}
                placeholder="Titulo da viagem"
                id="name"
                type="text"
                />

                <label htmlFor="planet">Planeta:</label>
                <select
                value = {selecPlanet}
                onChange = {handleSelecPlanet}
                name="select"
                id="planet"
                >
                    <option value="" disabled selected>Escolha um planeta</option>
                    <option value="Mercúrio">Mercúrio</option>
                    <option value="Vênus">Vênus</option>
                    <option value="Terra">Terra</option>
                    <option value="Marte">Marte</option>
                    <option value="Jupiter">Jupiter</option>
                    <option value="Saturno">Saturno</option>
                    <option value="Urano">Urano</option>
                    <option value="Netuno">Netuno</option>
                    <option value="Plutão">Plutão</option>
                </select>

                <label htmlFor="date">Data de lançamento:</label>
                <input
                value = {inputDate}
                onChange = {handleInputDate}
                id="date"
                type="date"
                />

                <label htmlFor="description">Descrição:</label>
                <textarea
                value = {textareaDescription}
                onChange = {handleTextareaDescription}
                placeholder="Escreva aqui a descrição da viagem"
                name="textarea"
                id="description"
                cols="25"
                rows="5"
                />

                <label htmlFor="duration">Duração:</label>
                <input
                value = {inputDuration}
                onChange = {handleInputDuration}
                placeholder="Duração em dias"
                id="duration"
                type="number"
                />

                <button onClick={() => {createTrip()}} >Criar</button>
            </section>
            <hr />
            <TravelList currentPage={"adminPage"} />
        </div>
    )

}
export default AdminPage