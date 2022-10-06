import { Request, Response } from "express";
import connection from "../database/connection";

export const editNickname = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {userId} = req.params
        const nickname : string = req.body.nickname
        if(typeof nickname !== "string") {
            errorCode = 406
            throw new Error("'nickname' deve ser do tipo string");            
        }
        if(nickname.length < 3 ) {
            errorCode = 406
            throw new Error("'nickname' deve ter ao menos 3 caracteres");
        }
        const [user] = await connection.raw(`
        SELECT * FROM Users
        WHERE id = "${userId}"
        `)
        if (user[0] === undefined) {
            errorCode = 404
            throw new Error("Usuário não encontrado.");
        }
        await connection.raw(`
        UPDATE Users
        SET nickname = "${nickname}"
        WHERE id = "${userId}";
        `)
        res.status(201).send({message: "Apelido atualiado com sucesso"})
    } catch (error) {
        if(error.statusCode === 200) {
            res.status(500).end()
          }else {
            res.status(errorCode).send({message: error.message})
        }
    }
}