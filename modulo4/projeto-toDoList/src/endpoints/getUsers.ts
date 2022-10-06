import { Request, Response } from "express";
import connection from "../database/connection";

export const getUsers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const search = req.query.search as string
        if(search) {
            const [users] = await connection.raw(`
            SELECT * FROM Users
            WHERE LOWER(name) or LOWER(nickname) LIKE "%${search.toLowerCase()}%";
            `)
            // Search query by name or nickname; 
            // console.log(users[0])
            if(users[0] === undefined) {
                errorCode = 404
                throw new Error("Usuário não encontrado.");
            }
            return res.status(200).send({message: "Usuários encontrados com suceso", users})
        }

        const [users] = await connection.raw(`
            SELECT * FROM Users;
        `)
        res.status(200).send({message: "lista de usuários encontrada com sucesso", users})
    } catch (error) {
        if(error.statusCode === 200) {
            res.status(500).end()
          }else {
            res.status(errorCode).send({message: error.message})
        }
    }
}
