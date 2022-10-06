import React from "react";
import "./style.css"
import axios from "axios";
import logoMusic from "./img/music.png"

const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists"

const headers = {
    headers: {
      Authorization: "samuel-araujo-aragon"
    }
}

export default class AddScreen extends React.Component {
    state = {
        playlist: "",
        arrayPlayList: []
    }
    componentDidMount(){
        this.getPlayList()
    }
    changePlaylist = (event) =>{
        this.setState({playlist: event.target.value})
    }
    getPlayList = () =>{
        axios.get(url, headers)
        .then((response)=> {
            this.setState({arrayPlayList: response.data.result.list})
        })
        .catch((error) =>{
            alert(error.response.data)
        })
    }
    addPlaylist = () =>{
        const body = {
            name: this.state.playlist
        }
        axios.post(url,body,headers)
        .then((response) => {
            alert(`Playlist ${this.state.playlist} adicionada com sucesso!! :)`)
            this.setState({playlist: ""})
            this.getPlayList()
        })
        .catch((error) => {
            alert(error.response.data);
        })
    }
    deletePlaylist = (id) =>{
        const urlDelete= `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`
        axios.delete(urlDelete, headers)
        .then((response) => {
            alert('Playlist excluida com sucesso! :)')
            this.getPlayList()
        })
        .catch((error)=>{
            alert('Ocorreu um erro, tente novamente. :(')
        })
    }

    render(){
        const playlists = this.state.arrayPlayList.map((playlist) =>{
            return(
                
                    <li  className="list-playlist" key={playlist.id}>
                        <div>
                        <img className="img-music" src={logoMusic}/>
                        {playlist.name}
                        </div>
                        <button  onClick={() => {this.props.goToMusica(`${url}/${playlist.id}`)}}>Acessar Playlist</button>
                        <button onClick={() => this.deletePlaylist(playlist.id)}>Excluir</button>
                    </li>
            )
        })
        return(
        <main>
            <input 
            type="text"
            placeholder="PlayList"
            value={this.state.playlist}
            onChange={this.changePlaylist}
            />
            <button onClick={this.addPlaylist}>Adicionar PlayList</button>
            <div>
                {playlists}
            </div>
        </main>
        )
    }
}