import styled from "styled-components"

const HeaderInstaLab = styled.header`
  display: flex;
  justify-content: space-between;
  color: white;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,107,1) 50%, rgba(0,126,255,1) 100%);
  
  .main-title{
    margin-top: 25px;
    margin-left: 20px;
  }

  .user{
    width: min-content;
    margin: 20px;
    font-weight: bolder;
  }

  .userImg {
    width: 100%;
    border-radius: 80px;
    border: 2px solid white;
  }

`

export function Header(props) {

    return (
      <HeaderInstaLab>
        <h1 className="main-title">Post</h1>
        <section className="user">
          <img className="userImg" src={props.userPhoto} alt="foto do usuario" />
          <p>{props.userName}</p>  
        </section>      
      </HeaderInstaLab>
    )
  }