import { useState } from "react"
import styled from "styled-components"

const LikeAndComment = styled.main`
    margin: auto;
    width: 30%;
    .like{
        margin-top: 5px;
        border: 3px solid rgba(121,9,107,1);
        display: flex;
        justify-content: space-between;
        padding: 5px;
        font-weight: bold;
    }
    .button-like {
        background-color: rgba(121,9,107,1);
        width: 20%;
        color: white;
        border: none;
    }
    .button-like:hover{
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,107,1) 50%, rgba(0,126,255,1) 100%);
        -webkit-transform: scale(1.5);
        transition: all 0.5s;
        transform: scale(1.1);
        cursor: pointer;
    }
    .comment {
        margin-top: 5px;
        padding: 5px;
        border: 3px solid rgba(121,9,107,1);
        padding: px;
        font-weight: bold;
    }
    .comment-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .button-comment {
        background-color: rgba(121,9,107,1);
        width: 40%;
        height: 20px;
        color: white;
        border: none;
    }
    .button-comment:hover{
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,107,1) 50%, rgba(0,126,255,1) 100%);
        -webkit-transform: scale(1.5);
        transition: all 0.5s;
        transform: scale(1.1);
        cursor: pointer;
    }
    .add-comment {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .comments {
        margin-top: 10px;
        font-weight: lighter;
    }
    .box-comment {
        width: 55%;
        margin-right: 15px;
    }

`

export function CommentLike(props) {
    const [like, setLike] = useState(false)
    const [commented, setCommented] = useState(false)
    const [comments, setComments] = useState([])
    const [numberComments, setNumbersComments] = useState(0)
    const [inputValue, setInputValue] = useState("")

    const changeLike = () => {
        setLike(!like)
    }
    const changeNumberLike = () => {
        if (like === true) {
            return 1
        } else {
            return 0
        }
    }

    const addComments = () => {
        setCommented(!commented)
    }
    const onChangeComment = (event) => {
        setInputValue(event.target.value)
    }
    const sendComment = (comment) => {
        const listComments = [...comments, comment]
        setComments(listComments)
        setCommented(false)
        setNumbersComments(numberComments + 1)
        setInputValue("")
    }

    const boxComments = commented ? (
        <div className="add-comment">
            <input
                className="box-comment"
                placeholder="Escreva o seu comentário"
                value={inputValue}
                onChange={onChangeComment}
            />
            <button className="button-comment" onClick={() => { sendComment(inputValue) }}>
                Enviar
            </button>
        </div>
    )
        : (
            comments.map((comment, index) => {
                return (
                    <div key={index}>
                        <p className="comments">{comment}</p>
                    </div>
                )
            })

        )
    return (
        <LikeAndComment>
            <section className="like">
                <p>Curtidas: {changeNumberLike()}</p>
                <button className="button-like" onClick={() => changeLike()}>{like === false ? "Like" : "Dislike"}</button>
            </section>
            <section className="comment">
                <div className="comment-button">
                    <p>Comentários: {numberComments}</p>
                    <button className="button-comment" onClick={addComments}>{commented === false ? "Adcionar comentário" :"Fechar Comentário"}</button>
                </div>
                {boxComments}
            </section>
        </LikeAndComment>
    )
}