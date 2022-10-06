import { useState } from 'react'
import Header from './components/Header'
import Match from './pages/Match'
import Profile from './pages/Profile'
import { createGlobalStyle } from "styled-components"


const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  };
`

function App() {
  const [currentPage, setCurrentPage] = useState("profile")

  const selectPage = () => {
    switch(currentPage) {
      case "profile":
        return <Profile />
      case "match":
        return <Match />
    }
  }

  const goToMatch = () => {
    setCurrentPage("match")
  }
  const goToProfile = () => {
    setCurrentPage("profile")
  }

  return (
    <div>
      <GlobalStyle />
      <Header
        goToMatch={goToMatch}
        currentPage={currentPage}
        goToProfile={goToProfile}
      />
      {selectPage()}
    </div>
  )
}

export default App
