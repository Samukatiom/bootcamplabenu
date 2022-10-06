import express from "express";
import cors from "cors"
import { Request, Response } from "express";
import { users } from "./users";

const app = express()

app.use(cors())
app.use(express.json()) 

//endPointTest

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Server working")
})

//popularUsers

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

//searchUserById

app.get('/users/:id', (req: Request, res: Response) => {
    const id : number = Number(req.params.id)
    // console.log(id)
    const user = users.filter(user => user.id === id)
    res.status(200).send(user)
})

//changePhoneNumber

app.put('/users/:id', (req: Request, res: Response) => {
    const id : number = Number(req.params.id)
    const phoneNumber : string = req.body.phone

    const editNumber = users.map(user => {
        if(id === user.id) {
            {user.phone = phoneNumber}
        }
    })
    console.log(users)
    res.status(200).send("Número do telefone alterado com sucesso")

})

//deleteUser

app.delete('/users/:id', (req: Request, res: Response) => {
    const id : number = Number(req.params.id)

    const index : number  = users.findIndex(user => user.id === id)

    users.splice(index, 1)
    res.status(200).send("Usuário removido com sucesso!")

})

app.listen(3003, () => console.log("Server is runnin on port 3003"))