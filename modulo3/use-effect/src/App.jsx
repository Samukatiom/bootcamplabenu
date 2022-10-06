import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"


const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  };
`

const PokePage = styled.div`
    .header-poke{
      background-color: red;
      height: 60px;
      padding: 10px;
      color: white;
      text-align: center;
    }
    .nav-poke{
      display: flex;
      justify-content: center;
      margin: 5px;
    }
    .select-poke{
      margin-left: 5px;
      width: 130px;

    }
    .select-poke:hover{
      cursor: pointer;
      transition: all 0.5s;
      -webkit-filter: drop-shadow(15px 10px 5px rgba(0,0,0,.5));
      filter: drop-shadow(15px 10px 5px rgba(0,0,0,.5));

    }
`


function App() {
  // Passo 3b
  const [pokeList, setPokeList] = useState([])
  const [pokeName, setPokeName] = useState("")

  // Passo 3c
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then((res) => {
        setPokeList(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])
  // componentDidMount = () => {
  //   axios
  //     .get("https://pokeapi.co/api/v2/pokemon/?limit=151")
  //     .then((res) => {
  //       this.setState({ pokeList: res.data.results });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // Passo 3a
  const changePokeName = (event) => {
    // Passo 3d
    setPokeName(event.target.value)
  };

  // Passo 3e
  const pokeOptions = pokeList.map(pokemon => {
    return (
      <option key={pokemon.name} value={pokemon.name}>
        {pokemon.name}
      </option>
    );
  });

  // Passo 4a
  const pokemon = pokeName && <PokeCard pokeName={pokeName} />;

  return (

    <PokePage>
      <GlobalStyle />
      <header className="header-poke">
        <h1>Exibir Pokémon</h1>
      </header>
      <nav className="nav-poke">
        <label htmlFor={"select-pokemon"}>Selecione um pokemon: </label>
        {/* Passo 3a */}
        <select className="select-poke" onChange={changePokeName} id={"select-pokemon"} >
          <option value={""}>Nenhum</option>
          {/* Passo 3e */}
          {pokeOptions}
        </select>
      </nav>
      <main>
        {pokemon}
      </main>
    </PokePage>
  );
};

export default App;
