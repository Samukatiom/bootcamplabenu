import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardPost from "../components/CardPost";
import CreateNewPost from "../components/CreateNewPost";
import Header from "../components/Header";
import { GlobalContext } from "../global/GlobalState";
import { goToLogin } from "../routes/coordinator";
import styled from "styled-components";

const SectionPosts = styled.section`
    .loader  {
        margin: 10% auto;
        animation: rotate 1s infinite;  
        height: 50px;
        width: 50px;
    }
    .loader:before,
    .loader:after {   
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;  
    width: 20px;
    }
    .loader:before {
    animation: ball1 1s infinite;  
    background-color: cyan;
    box-shadow: 30px 0 0 cyan;
    margin-bottom: 10px;
    }
    .loader:after {
    animation: ball2 1s infinite; 
    background-color: red;
    box-shadow: 30px 0 0 cyan;
    }

    @keyframes rotate {
    0% { 
        -webkit-transform: rotate(0deg) scale(0.8); 
        -moz-transform: rotate(0deg) scale(0.8);
    }
    50% { 
        -webkit-transform: rotate(360deg) scale(1.2); 
        -moz-transform: rotate(360deg) scale(1.2);
    }
    100% { 
        -webkit-transform: rotate(720deg) scale(0.8); 
        -moz-transform: rotate(720deg) scale(0.8);
    }
    }

    @keyframes ball1 {
    0% {
        box-shadow: 30px 0 0 cyan;
    }
    50% {
        box-shadow: 0 0 0 cyan;
        margin-bottom: 0;
        -webkit-transform: translate(15px,15px);
        -moz-transform: translate(15px, 15px);
    }
    100% {
        box-shadow: 30px 0 0 red;
        margin-bottom: 10px;
    }
    }

    @keyframes ball2 {
    0% {
        box-shadow: 30px 0 0 red;
    }
    50% {
        box-shadow: 0 0 0 red;
        margin-top: -20px;
        -webkit-transform: translate(15px,15px);
        -moz-transform: translate(15px, 15px);
    }
    100% {
        box-shadow: 30px 0 0 cyan;
        margin-top: 0;
    }
    }
    .section-one {
        border-radius: 12px;
        margin: 10px 5px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        height: 180px;
        box-shadow: red 1px 1px 1px;
    }
    .user-logout {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-shadow: red -0.5px 0, cyan 0.5px 0;
    }
    .button {
        border: 1px solid red;
        box-shadow: cyan 1px 1px 1px;
        width: 50%;
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
    .page {
        margin: 10px;
        font-size: 1.5rem;
        font-weight: bolder;
    }

    .button-return-page {
        position: absolute;
        margin: 10px;
        right: 0;
        border: 1px solid red;
        box-shadow: cyan 1px 1px 1px;
        width: 12%;
        height: 28px;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1rem;
    }

    .change-page {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .button-change-page {
        margin: 10px;
        border: 1px solid red;
        box-shadow: cyan 1px 1px 1px;
        width: 12%;
        height: 28px;
        background-color: white;
        border-radius: 12px;
        text-shadow: red -1px 0, cyan 1px 0;
        font-weight: bolder;
        font-size: 1rem;
    }
    .button-change-page:hover, .button-return-page:hover {
        cursor: pointer;
        text-shadow: red -3px 0, cyan 3px 0;
    }

    .show-post {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export default function PostPage() {
    const context = useContext(GlobalContext)
    const { posts, page } = context.states
    const { setPage } = context.setters
    const { getPosts } = context.getters

    const token = window.localStorage.getItem("token-labEddit")
    const email = window.localStorage.getItem("email-labEddit")

    const navigate = useNavigate()

    const changePage = (sum) => {
        const newPage = page + sum
        setPage(newPage)
        window.scrollTo(0, 250)
    }
    const backToStart = () => {
        setPage(1)
    }

    const showPost = posts.length ? posts.map((post) => {
        return (
            <CardPost
                feed={true}
                post={post}
            />
        )
    }) : <div className="loader"></div>


    const logout = () => {
        window.localStorage.removeItem("token-labEddit")
        window.localStorage.removeItem("email-labEddit")
        goToLogin(navigate)
    }

    useEffect(() => {
        document.title = "LabeEddit | Posts"
        if (posts) {
            getPosts(page)
        }
    }, [page])

    useEffect(() => {
        if (!token) {
            goToLogin(navigate)
        }
    })

    return (
        <>
            <Header />
            <SectionPosts>
                <div className="section-one">
                    <CreateNewPost getPosts={getPosts} />

                    <section className="user-logout">
                        <h3>{email}</h3>
                        <button className="button" onClick={() => { logout() }}>Logout</button>
                    </section>
                </div>
                <p className="page"> Página: {page}</p>
                {page > 2 && <button className="button-return-page" onClick={() => backToStart()}>Voltar ao começo</button>}
                <div className="show-post">
                    {showPost}
                </div>
                <section className="change-page">
                    {page !== 1 && <button className="button-change-page" onClick={() => changePage(-1)}>Página Anterior</button>}
                    <button className="button-change-page" onClick={() => changePage(1)}>Próxima Página</button>
                </section>
            </SectionPosts>
        </>
    )
}