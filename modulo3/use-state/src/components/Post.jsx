import styled from "styled-components"

const CardPost = styled.main`
    color: white;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,107,1) 50%, rgba(0,126,255,1) 100%);
    margin: auto;
    margin-top: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;

    .post-img {
        width: 100%;
        border: 2px solid white;
    }

    .subtitle {
      margin-top: 5px;
      font-weight: bold;
    }

`

export function Post(props) {

    return (
      <CardPost>
        <img className="post-img" src={props.postPhoto} alt="foto do post" />
        <p className="subtitle">{props.subtitle}</p>        
      </CardPost>
    )
  }