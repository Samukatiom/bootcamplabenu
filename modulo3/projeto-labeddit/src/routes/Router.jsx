import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "../pages/DetailsPage";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import SignupPage from "../pages/SignupPage";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<PostPage />} />
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignupPage />}/>
                <Route path="/post/:postId" element={<DetailsPage />}/>
            </Routes>
        </BrowserRouter>
    )
}