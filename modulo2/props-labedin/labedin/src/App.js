import React from 'react';
import './App.css';
import fotoEu from './img/eu.jpg';
import logoPositivo from './img/positivo.png';
import flecha from './img/flecha.png';
import CardGrande from './components/CardGrande/CardGrande';
import ImagemButton from './components/ImagemButton/ImagemButton';
import CardPequeno from './components/CardPequeno/CardPequeno';
import imgEmail from './img/email.png';
import imgEndereco from './img/endereco.png';
import styled from 'styled-components';

const PaginaApp = styled.body`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`
const Container = styled`
    width: 40vw;
  margin: 10px 0;
  text-align: center;
  margin-bottom: 20px
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

function App() {
  return (
    <PaginaApp>
      <Container>
        <h2>Dados pessoais</h2>
        <CardGrande 
          imagem = {fotoEu}
          nome="Samuel Araujo" 
          descricao="Oi, eu sou o Samuel. Sou estudante da Labenu do Curso Web Full Stack. Até agora gostei muito de front-end, e estou ansioso para começar a estudar o back-end"
        />
        
        <ImagemButton 
          imagem= {flecha} 
          texto="Ver mais"
        />
      </Container>
      <Container>
        <CardPequeno
        imagem= {imgEmail}
        texto= 'Email:'
        descricao= 'samuekatiom@gmail.com'
        />
      </Container>
      <Container>
        <CardPequeno
        imagem= {imgEndereco}
        texto= 'Endereço: '
        descricao= 'Amado Henrique Pereira 83 - Curitiba - PR'
        />
      </Container>

      <Container>
        <h2>Experiências profissionais</h2>
        <CardGrande 
          imagem= {logoPositivo}
          nome="Curso Positivo" 
          descricao="Trabalhei por 11 meses no departamento de Tecnologia Educacional." 
        />
      </Container>

      <Container>
        <h2>Minhas redes sociais</h2>
        <ImagemButton 
          imagem="https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png" 
          texto="Facebook" 
        />        

        <ImagemButton 
          imagem="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png" 
          texto="Twitter" 
        />        
      </Container>
    </PaginaApp>
  );
}

export default App;
