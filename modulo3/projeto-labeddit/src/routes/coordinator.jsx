export const goToPostPage = (navigate) =>{
    navigate("/")
}

export const goToLogin = (navigate) =>{
    navigate("/login")
}

export const goToSignup = (navigate) =>{
    navigate("/signup")
}

export const goToComment = (navigate, postId) => {
    navigate(`/post/${postId}`)
}

export const goToBack = (navigate) =>{
    navigate(-1)
}