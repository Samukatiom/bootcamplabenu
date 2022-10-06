import { Request, Response } from "express";
import connection from "../database/connection";

export const getTasks =  async (req: Request ,res: Response) => {
    let errorCode = 400
    try {
        const search = req.query.search as string
        if(search) {
            const [tasks] = await connection.raw(`
            SELECT * FROM Tasks
            WHERE LOWER(title) LIKE "%${search}%"
            `);
            // console.log(tasks[0])
            if(tasks[0] === undefined) {
                errorCode = 404
                throw new Error("Tarefa não encontrada.");
            }
            return res.status(200).send({message: "Tarefas encontradas com sucesso.", tasks})
        }
        const [tasks] = await connection.raw(`
        SELECT * FROM Tasks;
        `) 
        res.status(200).send({message: "Lista de tarefas encontradas com sucesso.", tasks})
    } catch (error) {
        if(error.statusCode === 200) {
            res.status(500).end()
          }else {
            res.status(errorCode).send({message: error.message})
        }
    }
}