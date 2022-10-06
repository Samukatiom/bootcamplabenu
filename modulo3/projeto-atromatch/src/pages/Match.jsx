import axios from 'axios'
import { useEffect, useState } from 'react'
import { ALUNO, BASE_URL } from '../constants/Url'
import styled from 'styled-components'

const Cards = styled.main`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CardsMatch = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  .card{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* border: 1px solid black; */
    box-shadow: 0 0 3px #F8B552;
    align-items: center;
    width: 25rem;
    padding: 10px;
  }
  .img-card {
    width: 15rem;
  }
  .p-card {
    font-size: 1.3rem;
    font-weight: 600;
  }
  @media screen and (min-device-width : 320px) and (max-device-width : 480px) {
    display: flex;
    flex-direction: column;
    .card{
      width: 20rem;
    }
    .img-card {
    width: 10rem;
  }
}

`


function Match() {
  const [match, setMatch] = useState()

  useEffect(()=>{
    getMatchs()
  },[] )

  const getMatchs = () =>{
    axios.get(`${BASE_URL}/${ALUNO}/matches`)
    .then((response)=>{
      setMatch(response.data.matches)
      console.log(match)})
    .catch(()=>{console.error('deu ruim em pegar os match')})
  }

  const cardsMatchs = match && match.map((person) => {
    return (
      <figure className='card' key={person.id}>
        <img className='img-card' src={person.photo} alt={person.photo_src} />
        <p className='p-card'>{person.name}</p>
      </figure>
    )
  })

  return (
    <Cards>
      <h2>Match</h2>
      <CardsMatch>
        {cardsMatchs}
      </CardsMatch>
    </Cards>
  )
}

export default Match