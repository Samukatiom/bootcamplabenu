import { Request, Response } from "express";
import connection from "../database/connection";
// mvp
export const postAddResponsible = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { taskId, userId } = req.body
        const [task] = await connection.raw(`
        SELECT * FROM
        Tasks
        WHERE id = "${taskId}";
        `)
        if(task[0] === undefined) {
            errorCode = 404
            throw new Error("Tarefa não encontrada");
        }
        const [responsilbe] = await connection.raw(`
        SELECT Users.id AS userId,
        Users.nickname
        FROM Responsibles
        JOIN Tasks
        ON Responsibles.taskId = Tasks.id
        JOIN Users
        ON Responsibles.userId = Users.id
        WHERE Tasks.id LIKE "%${taskId}%";
        `)
        if(responsilbe[0] !== undefined) {
            errorCode = 401 
            throw new Error("A tarefa já foi atribuida a outro usuário.");
        }
        await connection.raw(`
        INSERT INTO Responsibles (userId, taskId)
        VALUES("${userId}","${taskId}")
        `)
        res.status(201).send({message :"Usuário vinculado a tarefa com suecesso."}) 
    } catch (error) {
        if(error.statusCode === 200) {
            res.status(500).end()
          }else {
            res.status(errorCode).send({message: error.message})
        }
    }
}