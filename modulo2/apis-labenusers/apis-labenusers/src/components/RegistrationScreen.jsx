import React from "react";
import axios from "axios";
import "./RegistrationScreen.css"

export default class RegistrationScreen extends React.Component{
    state = {
        name: "",
        email: ""
    }

    handleName = (event) => {
        this.setState({name: event.target.value})
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value})
    }

    singUp = () => {
        const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"
        const body = {
            name: this.state.name,
            email: this.state.email
        }
        const key = {
            headers: {
                Authorization: "samuel-araujo-aragon"
            }
        }
        axios.post(url, body, key)
        .then((response)=>{
            alert(`Usuário ${this.state.name} cadastrado com sucesso! :)`)
            this.setState({name:"", email:""})
        })
        .catch((error)=>{
            alert("Ops, algo deu errado, por favor revise os dados digitados e tente novamente!")
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <h2 className="title-register">Cadastro</h2>
                <section className="inputs-button">
                    <label>
                        <input 
                        type="text"
                        className="inputs-register"
                        placeholder="Nome"
                        value={this.state.name}
                        onChange={this.handleName}
                        />
                    </label>
                    <label>
                        <input
                        type="text"
                        className="inputs-register" 
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmail}
                        />
                    </label>
                    <button className="button-register" onClick={this.singUp}>Cadastrar</button>
                    <button className="button-goUser" onClick={this.props.goList}>Lista de Usuários</button>
                </section>
            </div>
        )
    }
}