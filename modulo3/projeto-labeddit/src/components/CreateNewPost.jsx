import axios from "axios"
import { useContext } from "react"
import { BASE_URL } from "../constants/BASE_URL"
import { GlobalContext } from "../global/GlobalState"
import styled from "styled-components"

const NewPost = styled.section`
    display: flex;
    flex-direction: column;
    .title {
        margin: 10px;
    }
    .button-post {
        border: 0.5px solid red;
        box-shadow: cyan 1px 1px 1px;
        width: 30%;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1rem;
        margin: 10px;
    }

    .button-post:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
    }

    .inputs {
        border: 0.5px solid red;
        box-shadow: cyan 1px 1px 1px;
        margin: 5px;
        width: 160%;
        height: 30px;

        padding: 10px;
    }
    .inputs:hover {
        opacity: 70%;
        text-shadow: red -2px 0, cyan 2px 0;
    }
`

export default function CreateNewPost(props) {
    const context = useContext(GlobalContext)
    const { newPost } = context.states
    const { setNewPost } = context.setters

    const onChangeNewPost = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value })
    }

    const token = window.localStorage.getItem("token-labEddit")

    const createPost = (event) => {
        event.preventDefault()

        axios.post(`${BASE_URL}/posts`, newPost,
            {
                headers: {
                    Authorization: token
                }
            })
            .then(() => {
                alert("Post criado com sucesso")
                props.getPosts()
                setNewPost({
                    "title": "",
                    "body": ""
                })

            })
            .catch((err) => {
                alert("Algo deu errado, tente novamente")
                console.log(err)
            })
    }

    return (
        <NewPost>
            <h2 className="title">Crie um novo Post</h2>
            <form className="form" onSubmit={createPost}>
                <label htmlFor="titulo"></label>
                <input
                    className="inputs"
                    id="titulo"
                    placeholder="Título da postagem"
                    value={newPost.title}
                    name="title"
                    onChange={onChangeNewPost}
                />
                <label htmlFor="descricao"></label>
                <input
                    className="inputs"
                    id="descricao"
                    placeholder="Descrição da postagem"
                    value={newPost.body}
                    name="body"
                    onChange={onChangeNewPost}
                />

                <button className="button-post">Postar</button>
            </form>
        </NewPost>
    )
}