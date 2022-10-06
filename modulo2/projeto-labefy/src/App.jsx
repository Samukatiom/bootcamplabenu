import React from 'react'
import './App.css'
import AddScreen from './components/AddScreen/AddScreen'
import Header from './components/Header/Header'
import Musics from './components/musics/Musics'

export default class App extends React.Component {
  state = {
    currentScreen: "playlist",
    clickedPlaylistUrl: ""
  }
  goToMusica = (url) => {
    this.setState({currentScreen: "music", clickedPlaylistUrl: url})
  }
  selecPage = () => {
    switch (this.state.currentScreen){
      case "playlist":
        return <AddScreen goToMusica={this.goToMusica} url={this.state.c}/>
      case "music":
        return <Musics/>
      default:
        return <AddScreen/>
    }
  } 
  render(){
    return(
      <>
      <Header/>
      {this.selecPage()}
      </>
      )
  }
}