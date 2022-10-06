import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "../pages/HomePage"
import ErrorPage from "../pages/ErrorPage"
import AdminPage from "../pages/AdminPage"
import DetailsPage from "../pages/DetailsPage"
import { useState } from "react"


function RoutesLabeX() {
    const [id, setId] = useState("")

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/admin"} element={<AdminPage  setId = {setId}/>}/>
                <Route path={"*"} element={<ErrorPage />} />
                <Route path={"/details"} element={<DetailsPage id = {id}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesLabeX