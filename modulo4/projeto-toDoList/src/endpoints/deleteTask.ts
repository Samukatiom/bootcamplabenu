import { Request, Response } from "express";
import connection from "../database/connection";

export const deleteTask = async(req:Request, res: Response) => {
    let errorCode = 400
    try {
        const {taskId} = req.params
        const [task] = await connection.raw(`
        SELECT * FROM Tasks
        WHERE id = "${taskId}"
        `)
        if (task[0] === undefined) {
            errorCode = 404
            throw new Error("Tarefa não encontrada.");
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
        // console.log(responsilbe[0])
        if(responsilbe[0] !== undefined) {
            await connection.raw(`
            DELETE FROM Responsibles
            WHERE TaskId = "${taskId}";
            DELETE FROM Tasks
            WHERE id = "${taskId}";
            `)
            // await connection.raw(`
            // DELETE FROM Tasks
            // WHERE id = "${taskId}";
            // `)
        }
        await connection.raw(`
        DELETE FROM Tasks
        WHERE id = "${taskId}";
        `)
        res.status(201).send({message: "Tarefa deletada com sucesso!"})
    } catch (error) {
        if(error.statusCode === 200) {
            res.status(500).end()
          }else {
            res.status(errorCode).send({message: error.message})
        }
    }
}