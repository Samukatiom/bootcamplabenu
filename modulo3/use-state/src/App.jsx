import { useState } from 'react'
import { Header } from './components/Header'
import { Post } from './components/Post'
import userPhoto from './components/img/user.jpeg'
import postPhoto from "./components/img/post.jpg"
import { CommentLike } from './components/CommentLike'
import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
`



function App() {

  return (
    
    <div>
      <GlobalStyle />
      <Header
      userPhoto = {userPhoto}
      userName = "Sheldon Cooper"
      />
      <Post
      subtitle = "Hoje acordei feliz, pois sei que sou a pessoa mais genial desse pequeno globo."
      postPhoto = {postPhoto}
      />
      <CommentLike />
    </div>
  )
}

export default App
