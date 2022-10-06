import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import CardPost from "../components/CardPost";
import Header from "../components/Header";
import NewComment from "../components/NewComment";
import { GlobalContext } from "../global/GlobalState";
import { goToBack, goToLogin } from "../routes/coordinator";
import styled from "styled-components";

const DetailsPost = styled.main`
    .button-back {
        border: 0.5px solid red;
        box-shadow: cyan 1px 1px 1px;
        width: 10%;
        height: 25px;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1rem;
        margin: 10px;
    }

    .button-back:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }

    .section-comment {

    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .title-comments {
        margin: 10px;
    }

`
// o nome da função deve ser trocada para "DetailsPage"
export default function CommentPage() {
    const context = useContext(GlobalContext)
    const { post } = context.states
    const params = useParams()
    const navigate = useNavigate()
    
    const token = window.localStorage.getItem("token-labEddit")

    useEffect(() => {
        document.title = "LabEddit | Detalhes"
        if (!token) {
            goToLogin(navigate)
        }
    })

    return (
        <>
            <Header />
            <DetailsPost>
                <button className="button-back" onClick={() => goToBack(navigate)}>Voltar</button>
                <section className="section-comment">
                    <div className="card">
                        <CardPost
                            key={post.id}
                            post={post}
                            feed={false}
                        />
                    </div>
                    <h3 className="title-comments">Comentários</h3>
                    <NewComment
                        postId={params.postId}
                    />
                </section>
            </DetailsPost>
        </>
    )
}