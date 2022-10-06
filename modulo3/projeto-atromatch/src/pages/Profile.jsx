import axios from 'axios'
import { useEffect, useState } from 'react'
import { ALUNO, BASE_URL } from '../constants/Url'
import styled from 'styled-components'
import astroLogo from '../components/img/astro-logo.png'

const PeopleCard = styled.main`
  .people {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    
  }

  .people-img{
    width: 20%;
    object-fit: contain;
    border-radius: 50px;
  }

  .person-text {
    font-size: 2rem;
    font-weight: 700;
  }

  .text-button{
    margin-top: 10px;
    width: 40vw;
    display: flex;
    justify-content: space-between;
  }

  .button-astro{
  width: 7rem;
  height: 44px;
  background: #F0940A;
  border-radius: 50px;
  color: white;
  border: none;
  font-weight: 550;
  font-size: 1.4rem;
  margin-right: 20px;
}
.button-astro:hover{
  background-color: white;
  color: #F0940A;
  transition: 600ms;
  cursor: pointer;
}
.button-astro:active{
  background-color: #F0940A;
  color: white;
}

.bio {
  font-size: 1.5rem;
}

.img-astro {
  width: 2rem;
  margin: 10px;
  opacity: 50%;
}

.reset {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.p-reset{
  font-size: 2rem;
  font-weight: 700;
}

.button-resetar{
  margin-top: 20px;
  width: 12rem;
  height: 44px;
  background: #F0940A;
  border-radius: 50px;
  color: white;
  border: none;
  font-weight: 550;
  font-size: 1.4rem;
  margin-right: 20px;
}
.button-resetar:hover{
  background-color: white;
  color: #F0940A;
  transition: 600ms;
  cursor: pointer;
}
.button-resetar:active{
  background-color: #F0940A;
  color: white;
}
@media screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .people-img{
    width: 50%;
    object-fit: contain;
    border-radius: 50px;
  }
  .text-button{
    margin-top: 10px;
    width: 90vw;
    display: flex;
    justify-content: space-between;
  }
  .bio {
    font-size: 1.3rem;
    text-align: center;
    margin: 10px;
  }
  .button-resetar:hover{
    background-color: #F0940A;
    color: white;
    transition: 0;
    cursor: pointer;
}
.button-astro:hover{
  background-color: #F0940A;
    color: white;
    transition: 0;
    cursor: pointer;
}
.p-reset{
  font-size: 1.5rem;
  font-weight: 700;
  margin: 10px;
}
.person-text {
    font-size: 1.5rem;
    font-weight: 700;
  }

}

`


function Profile() {
  const [profile, setProfile] = useState({})

  useEffect(()=>{
    getProfile()
  },[])

  const getProfile = () => {
    axios.get(`${BASE_URL}/${ALUNO}/person`)
      .then((response) => {
        setProfile(response.data.profile)
        // console.log(profile)
      })
      .catch((error) => { console.error(error.response) })
  }
  
  const likeOrDislike = (id, choice) => {
    const body = {
      id: id,
      choice: choice
    }
    axios.post(`${BASE_URL}/${ALUNO}/choose-person`, body)
    .then((response)=>{
      getProfile()
      if (body.choice && response.data.isMatch){
        alert("Deu match! ❤")
      }
    })
    .catch(()=>{
      console.error("deu ruim")
    })
  }
  
  const restart = () => {
    axios.put(`${BASE_URL}/${ALUNO}/clear`)
    .then(()=>{
      alert('Perfis resetados com sucesso!')
      getProfile()
    })
    .catch(()=>{
      alert.error('Deu ruim!')
    })
  }
    const peopleCard = profile && (
      <figure className='people'>
        
          <img className='people-img' src={profile.photo} alt={profile.photo_alt} />
          <div className='text-button'>
            <p className='person-text'>{profile.name}</p>
            <button className='button-astro' onClick={() => likeOrDislike(profile.id, true)}>Like</button>
          </div>
          <div className='text-button'>
            <p className='person-text'>{profile.age} Anos</p>
            <button className='button-astro' onClick={() => likeOrDislike(profile.id, false)}>Dislike</button>
          </div>
          <p className='bio'>{profile.bio}</p>
      </figure>
    )


  return (
    <PeopleCard>
        {peopleCard}
        {profile ? <img className='img-astro' src={astroLogo}/> 
        :(<div className='reset'>
          <p className='p-reset'>Você já viu todos os perfis, clique no botão a baixo para ve-los novamente.</p>
          <button className='button-resetar' onClick={() => restart()}>Resetar Perfis</button>
        </div>
        )}
    </PeopleCard>
  )
}

export default Profile