import axios from "axios";
import { createContext, useState } from "react";
import { BASE_URL } from "../constants/BASE_URL";

export const GlobalContext = createContext();

export default function GlobalState(props) {

    const token = window.localStorage.getItem("token-labEddit")
    
    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [signup, setSignup] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    )

    const [newPost, setNewPost] = useState(
        {
            "title": "",
            "body": ""
        }
    )

    const [post, setPost] = useState({})

    const [posts, setPosts] = useState([])

    const [page, setPage] = useState(1)

    const getPosts = (currentPage) => {
        axios.get(`${BASE_URL}/posts?page=${currentPage}&size=10`,
            {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                setPosts(res.data)
                console.log(posts)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const states = {
        form: form,
        signup: signup,
        posts: posts,
        post: post,
        page: page,
        newPost: newPost
    }
    const setters = {
        setForm: setForm,
        setSignup: setSignup,
        setPosts: setPosts,
        setPost: setPost,
        setPage: setPage,
        setNewPost: setNewPost
    }
    const getters = {
        getPosts: getPosts
    }


    const context = { states, setters, getters }
    return (
        <GlobalContext.Provider value={context}>
            {props.children}
        </GlobalContext.Provider>
    )
}
