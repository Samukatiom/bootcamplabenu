import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components"

const CardPoke = styled.div`
    text-align: center;
    margin: 20px;

    .poke-name{
        font-size: 2rem;
        margin: 25px;
        color: red;
    }
    .poke-weight{
        font-size: 1.5rem;
        margin: 25px;
    }
    .poke-type{
        font-size: 1.5rem;
    }
    .poke-img{
        width: 150px;
    }
    .poke-img:hover{
        transition: all 0.5s;
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        -webkit-filter: drop-shadow(15px 10px 5px rgba(0,0,0,.5));
        filter: drop-shadow(15px 10px 5px rgba(0,0,0,.5));
    }
`

function PokeCard(props) {
  // Passo 4b
  const [pokemon, setPokemon] = useState({})

  // Passo 4c
  useEffect(()=>{
    pegaPokemon(props.pokeName)
    console.log(pokemon)
  },[])


  // Passo 4c

  useEffect(()=> {
      if(props.pokeName !== pokemon) {
          pegaPokemon(props.pokeName)
      }
  }, [props.pokeName])
  // componentDidUpdate(prevProps) {
  //   if (prevProps.pokeName !== this.props.pokeName) {
  //     this.pegaPokemon(this.props.pokeName);
  //   };
  // };

  // Passo 4c
  const pegaPokemon = (pokeName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <CardPoke>
      {/* Passo 4d */}
      <strong className="poke-name">{pokemon.name && pokemon.name.toUpperCase()}</strong>
      {/* Passo 4d */}
      <p className="poke-weight">Peso: {pokemon.weight} Kg</p>
      {/* Passo 4d */}
      <p className="poke-type">Tipo: {pokemon.types && pokemon.types[0].type.name}</p>
      {/* Passo 4d */}
      {pokemon.sprites && (
          <img className="poke-img" src={pokemon.sprites.front_default} alt={pokemon.name} />
        )}
    </CardPoke>
  );
};

export default PokeCard;
