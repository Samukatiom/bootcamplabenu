import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { BASE_URL } from "../constants/BASE_URL";
import { GlobalContext } from "../global/GlobalState";
import { goToPostPage, goToSignup } from "../routes/coordinator";
import styled from "styled-components";

const SectionLogin = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: #6cffffb6 ;
    width: 50%;
    height: 290px;
    margin: 8% auto;
    border-radius: 12px;

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

    .button-login {
        border: none;
        width: 70%;
        height: 12%;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1.2rem;
    }

    .button-login:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }

    .button-signup {
        margin-bottom: 10px;
        border: none;
        width: 25%;
        height: 12%;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1.2rem;
    }
    .button-signup:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }
`

export default function LoginPage() {
    const context = useContext(GlobalContext)
    const { form } = context.states
    const { setForm } = context.setters

    const token = window.localStorage.getItem("token-labEddit")

    const navigate = useNavigate()

    const onChangeForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const login = (event) => {
        event.preventDefault()
        console.log(form)
        axios.post(`${BASE_URL}/users/login`, form)
            .then((res) => {
                // console.log(res.data.token)
                window.localStorage.setItem("token-labEddit", res.data.token)
                window.localStorage.setItem("email-labEddit", form.email)
                goToPostPage(navigate)
                setForm({            email: "",
                password: ""})

            })
            .catch((err) => { alert("Ops, parece que algo deu errado no seu login. deixa eu te fazer uma perguntinha, você já é cadastrado no LabEddit?")
            setForm({            email: "",
            password: ""}) })
    }

    useEffect(() => {
        if (token) {
            goToPostPage(navigate)
        }
        document.title = "LabEddit | Login"
    }, [])
    return (
        <>
            <Header />
            <SectionLogin>
                <form className="form" onSubmit={login}>
                    <label htmlFor="email"></label>
                    <input
                        className="inputs"
                        placeholder="E-mail"
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChangeForm}
                    />

                    <label htmlFor="senha"></label>
                    <input
                        className="inputs"
                        placeholder="Senha"
                        id="senha"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChangeForm}
                    />
                    <button className="button-login">Entrar</button>
                </form>
                <button
                className="button-signup"
                onClick={() => { goToSignup(navigate) }}
                >
                   Cadastrar-se
                </button>
            </SectionLogin>
        </>
    )
}