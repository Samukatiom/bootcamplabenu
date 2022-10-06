import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../constants/BASE_URL"
import { GlobalContext } from "../global/GlobalState"
import { goToBack } from "../routes/coordinator"
import { refactorDate } from "../utility/refactorDate"
import styled from "styled-components"

const Comments = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .comment {
        padding: 5px;
        margin: 10px 0;
        border-radius: 12px;
        width: 90vw;
        box-shadow: red 1px 1px 1px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .user-text {
        display: flex;
        align-items: center;
        width: 60vw;
    }

    .img-user-comment {
        box-shadow: cyan 1px 1px 10px;
        border-radius: 100px;
        margin-right: 10px;
    }

    .user {
        margin-right: 10px;
    }
    .comment-text {
        display: inline-block;
        width: 40vw;
    }
    .button {
        margin: 5px;
        border: 1px solid red;
        box-shadow: cyan 1px 1px 1px;
        width: 10rem;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1rem;
    }

    .button:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }
    .votes-date {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .votes {
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    .date {
        font-size: 0.8rem;
        opacity: 40%;
    }
    .input {
        border: 0.5px solid red;
        box-shadow: cyan 1px 1px 1px;
        margin: 5px;
        width: 40vw;
        height: 30px;

        padding: 10px;
    }
    .input:hover {
        opacity: 70%;
        text-shadow: red -2px 0, cyan 2px 0;
    }
`


export default function NewComment(props) {

    const context = useContext(GlobalContext)
    const { post } = context.states
    const [newComment, setNewComment] = useState("")

    const [comments, setComments] = useState([])

    const navigate = useNavigate()

    const token = window.localStorage.getItem("token-labEddit")

    const headers = {
        headers: {
            authorization: token
        }
    }

    const onChangeComment = (event) => {
        setNewComment(event.target.value)
    }

    const getPostComments = (id) => {

        axios.get(`${BASE_URL}/posts/${id}/comments`, headers)
            .then((res) => {
                setComments(res.data)
                console.log(comments && comments)
            })
            .catch((err) => { console.log(err) })
    }

    const createComment = (id) => {
        const body = {
            body: newComment
        }
        axios.post(`${BASE_URL}/posts/${id}/comments`, body,
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res.data)
                setNewComment("")
                getPostComments(post.id)
            })
            .catch((err) => { console.log(err) })
    }
    const createCommentVote = (id, vote, postId) => {
        const body = {
            direction: vote
        }
        axios.post(`${BASE_URL}/comments/${id}/votes`, body, headers)
            .then((res) => {
                console.log(res)
                getPostComments(postId)
            })
            .catch((err) => console.log(err))
    }
    const changeCommentVote = (id, changeVote, postId) => {
        const body = {
            direction: changeVote
        }
        axios.put(`${BASE_URL}/comments/${id}/votes`, body, headers)
            .then((res) => {
                console.log(res)
                getPostComments(postId)
            })
            .catch((err) => console.log(err))
    }
    const deleteCommentVote = (id, postId) => {
        axios.delete(`${BASE_URL}/comments/${id}/votes`, headers)
            .then((res) => {
                console.log(res)
                getPostComments(postId)
            })
            .catch((err) => console.log(err))
    }

    const showComments = comments.length ? comments.map((comment) => {
        return (
            <section className="comment" key={comment.id}>
                <div className="user-text">
                    <img className="img-user-comment" src={`https://picsum.photos/50/50?a=${comment.userId}`} alt="imagem aleatória buscada pelo id do usuário" />
                    <h4 className="user">{comment.username}</h4>
                    <p className="comment-text">{comment.body}</p>
                </div>

                {
                    <section className="section-buttons">
                        {
                            comment.userVote === null
                                ? <div>
                                    <button className="button" onClick={() => { createCommentVote(comment.id, -1, post.id) }}>
                                        Não gostei
                                    </button>
                                </div>
                                : <div>
                                    {comment.userVote === -1
                                        ? <button className="button" onClick={() => { deleteCommentVote(comment.id, post.id) }}>
                                            Deletar o Voto
                                        </button>
                                        : <button className="button" onClick={() => { changeCommentVote(comment.id, -1, post.id) }}>
                                            Mudar de Voto
                                        </button>}
                                </div>
                        }

                        {
                            comment.userVote === null
                                ? <div>
                                    <button className="button" onClick={() => { createCommentVote(comment.id, 1, post.id) }}>
                                        Gostei
                                    </button>
                                </div>
                                : <div>
                                    {
                                        comment.userVote === 1
                                            ? <button className="button" onClick={() => { deleteCommentVote(comment.id, post.id) }}>
                                                Deletar o Voto
                                            </button>
                                            : <button className="button" onClick={() => { changeCommentVote(comment.id, 1, post.id) }}>
                                                Mudar de Voto
                                            </button>}
                                </div>
                        }
                    </section>
                }
                <div className="votes-date">
                    <p className="votes">Votos: {comment.voteSum === null ? <span>0</span> : comment.voteSum}</p>
                    <p className="date">{refactorDate(comment?.createdAt)}</p>
                </div>
            </section>
        )
    }) : <p>Nenhum comentário ainda, seja o number One</p>

    useEffect(() => {
        if (post.id === props.postId) {
            getPostComments(post.id)
        } else (
            goToBack(navigate)
        )
    }, [])


    return (
        <Comments>
            {showComments}
            <section>
                <label htmlFor="comentario"></label>
                <input
                    placeholder="Digite aqui seu comentário"
                    className="input"
                    id="comentario"
                    value={newComment}
                    onChange={onChangeComment}
                    name="body"
                />
                {props.postId === post.id && <button className="button" onClick={() => { createComment(post.id) }}>Comentar</button>}
            </section>
        </Comments>
    )
}