import express, { Request, Response } from 'express'
import cors from 'cors'
import { Chores, chores } from './data'
const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("Server running on port 3003 ")
})

// endpoint para teste
// app.get("/ping", (req: Request, res: Response) => {
//     res.send("Pong")
// })

app.get("/ping", (req: Request, res: Response) => {
    try {
        res.send("pong")
    } catch (error) {
        res.send({ message: error.message })
    }
})

// endpoint que retorna a lista inteira de afazeres, se o query vier vazio, caso venha true, irá retornar apenas os afazeres com o valor completed igual a true, e caso vier com o valor query igual a false, retornar todos os afazeres com o valor completed com o valor false

app.get("/chores", (req: Request, res: Response) => {
    const search = req.query.search

    if (!search) {
        return res.status(200).send(chores)
    } else if (search === "true") {
        const filterChores = chores.filter((todo: Chores) => {
            return todo.completed === true
        })
        return res.status(200).send({
            busca: true,
            afazeres: filterChores
        })
    } else if (search === "false") {
        const filterChores = chores.filter((todo: Chores) => {
            return todo.completed === false
        })
        return res.status(200).send({
            busca: false,
            afazeres: filterChores
        })
    }

})

app.get("/chores/:userId", (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId)

        const filterChores = chores.filter((todo: Chores) => {
            return todo.userId === userId
        })
        if(filterChores.length === 0) {
            throw new Error("Erro: O Usuário não existe");
            
        }
        res.status(200).send({
            message: "Afazeres encontrado com sucesso",
            afazeres: filterChores
        })

    } catch (error) {
        res.send({ message: error.message })
    }
})


// endpoint para criação de um novo afazer

app.post("/chores", (req: Request, res: Response) => {
    try {
    const { userId, title } = req.body

    if(typeof userId !== "number" ) {
        throw new Error("Erro: tipo invalido de 'userId', deve ser do tipo number");        
    }
    if(typeof title !== "string") {
        throw new Error("Erro: tipo invalido de 'tilte', deve ser do tipo string");
        
    }

    const newErrand: Chores = {
        id: Date.now(),
        userId,
        title,
        completed: false
    }

    chores.push(newErrand)

    res.status(200).send({
        message: "Afazer adicionado com sucesso",
        afazer: newErrand
    })
    } catch (error) {
        res.send({menssage: error.message})
    }
    
})

// endpoint para editar o status da tarefa

app.put("/chores/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const filterChores = chores.filter((todo: Chores) => {
        return todo.id === id
    }).map((todo: Chores) => {
        if (todo.completed === true) {
            { todo.completed = false }
            return res.status(200).send({
                message: "Estado do completed mudado para false",
                afazer: todo
            })
        } else if (todo.completed === false) {
            { todo.completed = true }
            return res.status(200).send({
                message: "Estado do completed mudado para true",
                afazer: todo
            })
        }
    })
})

// endpoint para deletar um afazer de acordo 

app.delete("/chores/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const index = chores.findIndex((todo: Chores) => todo.id === id)

    if (index === -1) {
        return res.status(404).send({
            message: "Id não encontrada",
            id
        })
    }

    chores.splice(index, 1)

    res.status(200).send({
        message: "afazer deletado com sucesso",
        afazeres: chores
    })
})


