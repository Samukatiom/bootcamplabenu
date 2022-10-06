import express, { Request, Response } from "express"
import cors from "cors"
import { ageReturn } from "./utils/ageReturn"
import { custumers } from "./data"
import { Bill, Client } from "./types"
import { convertCpf } from "./utils/convertCpf"
import { currentDate } from "./utils/currentDate"

const app = express()

app.use(cors())
app.use(express.json())

// app.get('/ping' ,(req: Request, res: Response) => res.send("pong"))

// endpoint responsible for creating an account

app.post('/users', (req: Request, res: Response) => {
    let errorCode: number = 400

    try {
        const { name, birthDate } = req.body
        const cpf = convertCpf(req.body.cpf)

        // bussines rules
        if (cpf.length !== 14) {
            errorCode = 406
            throw new Error("O Cpf deve ter 11 números");
        }
        custumers.forEach((client: Client) => {
            if (client.cpf === cpf) {
                errorCode === 409
                throw new Error("Este cpf já foi atribuido a um cliente já cadastrado.");
            }
        })
        if (ageReturn(birthDate) < 18) {
            errorCode = 401
            throw new Error(" O cliente deve ser maior de idade (ter no mínimo 18 anos).");
        }
        if (name.length < 3) {
            errorCode = 406
            throw new Error("'name' deve ter no mínimo 3 letras.");
        }
        // creating a new custumer 
        const newClient: Client = {
            id: Date.now(),
            name,
            cpf,
            birthDate,
            balance: 0,
            extract: []
        }
        custumers.push(newClient)
        res.status(201).send({ message: "Usuário criado com sucesso!", newClient, custumers })
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
})

//endpoint to get user balance
app.get('/users/:id', (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const { id } = req.params
        const index = custumers.findIndex((client: Client) => client.id === Number(id))
        // bussines rules
        if (index < 0) {
            errorCode === 404
            throw new Error("Id não encontrado!");
        }
        res.status(200).send({ name: custumers[index].name, balance: custumers[index].balance })
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
})

// add balance

app.put('/users/:id', (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { id } = req.params
        const { deposit } = req.body
        const index = custumers.findIndex((client: Client) => client.id === Number(id))
        // bussines rules
        if (index < 0) {
            errorCode === 404
            throw new Error("Id não encontrado!");
        }
        if (deposit <= 0) {
            errorCode === 406
            throw new Error("O valor a ser adicionado deve ser maior que 0");
        }
        custumers[index].balance += deposit

        res.status(201).send({ message: "Saldo adicionado com sucesso", client: custumers[index] })

    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
})

app.put('/users/:id/pay', (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        const { id } = req.params
        const { value, description } = req.body
        //bussines rules
        const index = custumers.findIndex((client: Client) => client.id === Number(id))
        if (index < 0) {
            errorCode === 404
            throw new Error("Id não encontrado!");
        }
        if (value <= 0) {
            errorCode === 406
            throw new Error("O valor da conta a ser paga deve maior que 0");
        }
        if (value > custumers[index].balance) {
            errorCode === 406
            throw new Error("Saldo insuficiente");
        }
        if (description.length < 5) {
            errorCode === 406
            throw new Error("A descrição da conta deve ter ao menos 6 caractere");
        }
        const newBill: Bill = {
            value,
            description,
            payDay: currentDate
        }
        custumers[index].extract.push(newBill)
        custumers[index].balance -= value
        res.status(201).send({ message: "Pagamento realizado com sucesso!", client: custumers[index] })
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
})

app.listen(3003, () => console.log('Server running on port 3003'))