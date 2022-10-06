import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../constants/BASE_URL"
import { GlobalContext } from "../global/GlobalState"
import { goToComment } from "../routes/coordinator"
import { refactorDate } from "../utility/refactorDate"
import styled from "styled-components"

const MainPosts = styled.main`
    padding: 10px;
    margin: 10px;
    border-radius: 12px;
    box-shadow: cyan 1px 1px 15px;
    width: 50%;

    .section-user {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .user {
        margin-left: 15px;
    }
    .user-photo {
        width: 12%;
        border-radius: 100px;
        box-shadow: red 1px 1px 15px;
    }

    .publish {
        display: flex;
        flex-direction: column;
    }
    .title-publish {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    .legend-publish {
        font-size: 1.2rem;
        margin: 10px 0;
    }

    .create-date {
        display: flex;
        align-items: flex-end;
        justify-content: end;
        font-size: 0.8rem;
        opacity: 40%;
    }
    .votes {
        text-transform: uppercase;
        display: flex;
        justify-content: end;
    }
    .alinhar {
        text-align: center;
    }
    .div-buttons {
        display: inline;
    }

    .button-publish {
        margin: 10px;
        border: 1px solid red;
        box-shadow: cyan 1px 1px 1px;
        width: 30%;
        height: 30px;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1rem;
    }

    .button-publish:hover{
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }

`

export default function CardPost(props) {
    const token = window.localStorage.getItem("token-labEddit")

    const context = useContext(GlobalContext)
    const { setPost } = context.setters
    const { getPosts } = context.getters

    const navigate = useNavigate()

    const {
        userId, id, username, title, body, createdAt, voteSum, commentCount, userVote } = props.post

    const createPostVote = (id, sum) => {

        axios.post(`${BASE_URL}/posts/${id}/votes`, {
            direction: sum
        },
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res)
                getPosts()

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const changePostVote = (id, change) => {

        axios.put(`${BASE_URL}/posts/${id}/votes`, {
            direction: change
        },
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res)
                getPosts()

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deletePostVote = (id) => {
        axios.delete(`${BASE_URL}/posts/${id}/votes`,
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res)
                getPosts()

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const goComment = () => {
        setPost(props.post)
        goToComment(navigate, id)
    }




    return (
        <MainPosts>
            <div key={id}>
                <section className="section-user">
                    <img className="user-photo" src={`https://picsum.photos/400/400?a=${userId}`} alt="imagem aleatória buscada pelo id do usuário" />
                    <h2 className="user">{username}</h2>
                </section>
                <section className="publish">
                <h3 className="title-publish">{title}</h3>
                <img src={`https://picsum.photos/400/400?a=${id}`} alt="imagem aleatória buscada pelo id da postagem" />
                <p className="legend-publish"> Legenda: {body}</p>
                </section>
                <p className="votes">
                    Votos: 
                    {
                        voteSum === null
                            ? <span> 0</span>
                            : voteSum
                    }
                </p>
                {props.feed && <section className="alinhar">{
                    userVote === null
                        ? <button className="button-publish" onClick={() => createPostVote(id, -1)}>Não gostei</button>
                        : <div className="div-buttons">{userVote === -1 ? <button className="button-publish" onClick={() => deletePostVote(id)}>Deletar Voto</button> : <button className="button-publish" onClick={() => changePostVote(id, -1)}>Mudar Voto</button>}</div>
                }

                    {
                        userVote === null
                            ? <button className="button-publish" onClick={() => createPostVote(id, 1)}>Gostei</button>
                            : <div className="div-buttons">{userVote === 1 ? <button className="button-publish" onClick={() => deletePostVote(id)}>Deletar Voto</button> : <button className="button-publish" onClick={() => changePostVote(id, 1)}>Mudar Voto</button>}</div>
                    } </section>}
                <p className="value-comments">
                    Comentários:
                    {
                        commentCount === null
                            ? <span>0</span>
                            : commentCount
                    }

                </p>
                {props.feed && <button className="button-publish" onClick={() => goComment()}>Ver comentários</button>}
                <p className="create-date">Data da Postagem: {createdAt && refactorDate(createdAt)}</p>
            </div>


        </MainPosts>
    )
}