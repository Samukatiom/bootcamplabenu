import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BASE_URL } from "../constants/BASE_URL";
import { GlobalContext } from "../global/GlobalState";
import { goToBack, goToPostPage } from "../routes/coordinator";
import styled from "styled-components";

const SectionSignup = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: #6cffffb6 ;
    width: 50%;
    height: 290px;
    margin: 8% auto;
    border-radius: 12px;
    padding: 10px;

    .form{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .inputs {
        width: 160%;
        height: 15%;
        border: none;
        padding: 10px;
    }

    .inputs:hover {
        opacity: 70%;
        text-shadow: red -2px 0, cyan 2px 0;
    }

    .button {
        border: none;
        width: 70%;
        height: 12%;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1.2rem;
    }

    .button:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }

    .button-back {
        margin-bottom: 10px;
        border: none;
        width: 15%;
        height: 12%;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1.2rem;
    }
    .button-back:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }
`

export default function() {
    const context = useContext(GlobalContext)
    const {signup} = context.states
    const {setSignup} = context.setters

    const onChangeSignup = (event) => {
        setSignup({...signup, [event.target.name]: event.target.value})
    }

    const token = window.localStorage.getItem("token-labEddit")
    
    const newUser = (event) => {
        event.preventDefault()
        axios.post(`${BASE_URL}/users/signup`, signup)
        .then((res)=>{
            window.localStorage.setItem("token-labEddit", res.data.token)
            window.localStorage.setItem("email-labEddit", signup.email)
            setSignup(
                {
                    username: "",
                    email: "",
                    password:"" 
                }
            )

            goToPostPage(navigate)
        })
        .catch(()=>{alert("Eita, houve algum erro...Verifique seus dados e tente novamente!")})
    }
    useEffect(() => {
        document.title = "LabEddit | Cadastro"
    },[])
    useEffect(()=>{
        if(token) {
            goToPostPage(navigate)
        }
    },[])

    const navigate = useNavigate()

    return(
        <>
            <Header />
            <SectionSignup>
            <h2>Novo Usuário</h2>
            <form className="form" onSubmit={newUser}>
                <label htmlFor="nome"></label>
                <input
                    className="inputs"
                    id="nome"
                    placeholder="Digite aqui seu nome completo"
                    name="username"
                    value={signup.username}
                    onChange={onChangeSignup}
                />
                
                <label htmlFor="email"></label>
                <input
                    className="inputs"
                    id="email"
                    placeholder="exemplo@exemplo.com"
                    type="email"
                    name="email"
                    value={signup.email}
                    onChange={onChangeSignup}
                />

                <label htmlFor="senha"></label>
                <input
                    className="inputs"
                    id="senha"
                    placeholder="Insira uma senha de no mínimo 8 caracteres"
                    type="password"
                    name="password"
                    value={signup.password}
                    onChange={onChangeSignup}
                />

                <button className="button">Cadastrar</button>
            </form>
            <button className="button-back" onClick={()=> goToBack(navigate)}>Voltar</button>
            </SectionSignup>
        </>
    )
}