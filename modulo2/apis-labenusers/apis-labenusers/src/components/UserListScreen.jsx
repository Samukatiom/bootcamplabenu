import React from "react";
import axios from "axios";
import "./UserListScreen.css"

export default class UserListScreen extends React.Component{
    state = {
        users: []
    }
    componentDidMount() {
        this.getUser()
    }
    
    getUser = () => {
        const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"
        const key = {
            headers: {
                Authorization: "samuel-araujo-aragon"
            }
        }
        axios.get(url, key)
        .then((response)=> {
            this.setState({users: response.data})
        })
        .catch((error)=>{
            alert("Ops, ocorreu um problema. Tente novamente.")
        })
    }

    deleteUser = (id) => {
        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
        const key = {
            headers: {
                Authorization: "samuel-araujo-aragon"
            }
        }
        axios.delete(url, key)
        .then((response) =>{
            alert(`Usuario excluído com sucesso!!`)
            this.getUser()
        })
        .catch((error) =>{
           alert('Ocorreu um erro, tente novamente.')
        })
    }

    render(){
        const listUsers = this.state.users.map((user) => {
            return (<div 
                key={user.id}
                className="card-user">
                    {user.name}
                    <button className="excluir" onClick={() => this.deleteUser(user.id)}>Excluir</button>
                </div>)
        })

        return(
            <div>
                <h2 className="title-user">Lista de Usuários</h2>
                <section className="user-list">
                    {listUsers}
                    <button className="go-register" onClick={this.props.goRegister}>Voltar para Cadastro</button>
                </section>
            </div>
        )
    }
}