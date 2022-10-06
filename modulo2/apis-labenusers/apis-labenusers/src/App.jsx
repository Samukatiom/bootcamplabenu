import React from "react";
import "./App.css"
import RegistrationScreen from "./components/RegistrationScreen";
import UserListScreen from "./components/UserListScreen";

export default class App extends React.Component{
  state = {
    currentScreen:"register"
  }

  chooseCanvas = () => {
    switch (this.state.currentScreen){
      case "register":
        return <RegistrationScreen goList={this.goList}/>
      case "list":
        return <UserListScreen goRegister={this.goRegister}/>
      default:
        return <div>Erro! Pagina não encontrada!</div>
    }
  }

  goRegister = () => {
    this.setState({currentScreen: "register"})
  }

  goList = () => {
    this.setState({currentScreen: "list"})
  }

  render(){
    return(
      <div className="tag-pai">
        {this.chooseCanvas()}
      </div>
    )
  }
}
