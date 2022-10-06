import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL, user } from "../constants/url"
import { navigateToAdminPage } from "../routes/coordinator"

function Login() {
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    
    const navigate = useNavigate()

    const handleInputEmail = (event) => {
        setInputEmail(event.target.value)
    }
    const handleInputPassword = (event) => {
        setInputPassword(event.target.value)
    }

    const login = (email, password) =>{
        const body = {
                "email": email,
                "password": password
        }
        axios.post(`${BASE_URL}/${user}/login`, body)
        .then((response)=> {
            localStorage.setItem("token", response.data.token)
            alert('Login realizado com sucesso :)')
            navigateToAdminPage(navigate)
            console.log(response.data.token)
            setInputEmail("")
            setInputPassword("")
        })
        .catch((error) =>{
            console.log(error.response)
            alert('Ocorreu um erro, tente novamente.')
            setInputEmail("")
            setInputPassword("")
        })
    }
    return (
        <>
            <label htmlFor="email">Email:</label>
            <input
            id="email"
            type="text"
            value={inputEmail}
            onChange={handleInputEmail}
            />
            <label htmlFor="password">Senha:</label>
            <input
            id="password" 
            type="password"
            value={inputPassword}
            onChange={handleInputPassword}
            />
            <button onClick={() => login(inputEmail, inputPassword)}>Login</button>
        </>
    )

}
export default Login