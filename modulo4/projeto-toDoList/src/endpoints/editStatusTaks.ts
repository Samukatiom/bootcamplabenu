import { Request, Response } from "express";
import connection from "../database/connection";

export const editStatusTasks = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {taskId} = req.params
        const {status} = req.body
        if(status !== "TO_DO" || status !== "DOING" || status !== "DONE" ) {
            errorCode = 406
            throw new Error("O 'status' pode receber apenas três valores: 'TO_DO', 'DOING' e 'DONE'");
        }
        const [task] = await connection.raw(`
        SELECT * FROM Tasks
        WHERE id = "${taskId}"
        `)
        if (task[0] === undefined) {
            errorCode = 404
            throw new Error("Tarefa não encontrada.");
        }
        await connection.raw(`
        UPDATE Tasks
        SET status = "${status}"
        WHERE id = "${taskId}"
        `)
        res.status(201).send({message :"Status da tarefa alterado com sucesso!"})
    } catch (error) {
        if(error.statusCode === 200) {
            res.status(500).end()
          }else {
            res.status(errorCode).send({message: error.message})
        }
    }
}