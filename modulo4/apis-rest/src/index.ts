import express, { Request, Response } from "express"
import cors from "cors"
import { User, users, USER_ROLE } from "./data"
import { type } from "os"

const app = express()

app.use(cors())
app.use(express.json())

// endpoint for test
app.get('/ping' ,(req: Request, res: Response) => {
    try {
        res.status(200).send({message: "pong"})
    } catch (error) {
        res.status(500).send({message: "Houve um erro inesperado", error: error.message})
    }
})
app.listen(3003, () => console.log("server running on port 3003"))

//endpoint to search admin, normal or all users
app.get('/users', (req: Request, res:Response) => {
    try {
        const role = req.query.role
        const filteredUsers = users.filter((user : User) => {return user.role === role})
        if(!role) {
            res.status(200).send({message: "Usuários encontrados com sucesso!", users})
        }
        if(role === "admin")
        res.status(200).send({message: "Usuários adminstradores encontrados com sucesso!", users: filteredUsers})
        if(role === "normal")
        res.status(200).send({message: "Usuários normais encontrados com sucesso!", users: filteredUsers})
    } catch (error) {
        res.status(500).send({message: "Houve um erro inesperado", error: error.message})
    }
})

// endpoint for add users
app.post('/users', (req: Request, res: Response) => {
    try {
        const {name, email, age, role} = req.body
        // bussines rules
        if(typeof name !== "string") {
            throw new Error("'name' deve ser uma string");            
        }
        if(typeof email !== "string") {
            throw new Error("'email' deve ser uma string");            
        }
        if(typeof age !== "number") {
            throw new Error("'age' deve ser um number");            
        }
        if(role !== "admin" && role !== "normal") {
            throw new Error("'role' pode receber dois valores 'admin' ou 'normal'");   
        }
        // logic to check if there is any existing email
        const existingEmails = users.map((user : User) => {
            return user.email
        })
        const checkEmail = existingEmails.includes(email)
        if(checkEmail){
            throw new Error("O email digitado já foi usado!");
        }
        //creation of a new user and inclusion in the data
        const newUser : User = { id: Date.now(), name, email, role, age }
        users.push(newUser)
        res.status(201).send({message: "Usuário criado com sucesso", users})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

// endpoint to edit email
app.put("/users/:id", (req: Request, res: Response) => {
    // variable responsible for assigning the status in the response
    let errorCode: number = 400

    try {
        const id : number = Number(req.params.id)
        const {email} = req.body
        // bussines rules
        // logic to check if there is any existing email
        const existingEmails= users.map((user : User) => {
            return user.email
        })
        const checkEmail = existingEmails.includes(email)
        if(checkEmail){
            errorCode = 401
            throw new Error("O email digitado já foi usado!");
        }
        if(typeof email !== "string"){
            errorCode = 422
            throw new Error("'email' deve ser uma string");
        }
        // logic to change the email
        const userIndex = users.findIndex((user: User) => {
            return user.id === id 
        })
        if(userIndex < 0){
            throw new Error("'id' inexitente")
        }
        users[userIndex].email = email
        res.status(201).send({message: "Email alterado com sucesso", user: users[userIndex]})

    } catch (error) {
        res.status(errorCode).send({message: error.message})        
    }
})
// endpoint for delete user
app.delete('/users/:id', (req: Request, res: Response) => {
    let errorCode: number = 400

    try {
        const id : number = Number(req.params.id)
        
        const userIndex = users.findIndex((user : User) => {
            return user.id === id
        })
        if(userIndex < 0){
            errorCode = 422
            throw new Error("'id' inexitente")
        }
        users.splice(userIndex , 1)
        res.status(200).send({message: "Usuário deletado com sucesso!"})
    } catch (error) {
        res.status(errorCode).send({message: error.message});
    }
})