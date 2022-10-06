import { useState } from 'react'
import styled from 'styled-components'
import astroLogo from './img/astro-logo.png'

const HeaderAstro = styled.header`
background-color: #F8B552;
height: 110px;
display: flex;
align-items: center;
justify-content: space-between;
font-family: Arial, Helvetica, sans-serif;
font-style: normal;

.title-astro {
  font-weight: 700;
  font-size: 2rem;
  color: #FFFFFF;
}

.img-astro {
  width: 4rem;
}

.img-title{
  display: flex;
  align-items: flex-end;
  margin: 10px;
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

@media screen and (min-device-width : 320px) and (max-device-width : 480px) {
  height: 90px;

.title-astro {
  font-weight: 650;
  font-size: 1.5rem;
  color: #FFFFFF;
}

.button-astro{
  width: 6rem;
  height: 30px;
  background: #F0940A;
  border-radius: 20px;
  color: white;
  border: none;
  font-weight: 550;
  font-size: 1.2rem;
  margin-right: 20px;
}
.button-astro:hover{
  background-color: #F0940A;
  color: white;
  transition: 0;
  cursor: pointer;
}

}

`

function Header(props) {

  return(
    <HeaderAstro>
      <section  className='img-title'>
      <img className='img-astro' src={astroLogo} />
        <h1 className='title-astro'>AstroMatch</h1>
        </section>
        {props.currentPage === "profile"
          ?<button className='button-astro btn-animated' onClick={() => props.goToMatch()}>Matches</button>
          :<button className='button-astro btn-animated' onClick={() => props.goToProfile()}>Perfis</button>
          }
          
        
    </HeaderAstro>
  )
}

export default Header