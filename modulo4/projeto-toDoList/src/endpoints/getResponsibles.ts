import { Request, Response } from "express";
import connection from "../database/connection";

export const getResponsibles = async (req: Request, res: Response) => {
let errorCode = 400
try {
    const { taskId } = req.params
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
    // console.log(responsilbe[0])
    if(responsilbe[0] === undefined) {
        errorCode = 404
        throw new Error("Tarefa não encontrada.");
    }
    res.status(200).send({message: "Responsável pela tarefa encontrado com sucesso", responsilbe})
} catch (error) {
    if(error.statusCode === 200) {
        res.status(500).end()
      }else {
        res.status(errorCode).send({message: error.message})
    }
}
}