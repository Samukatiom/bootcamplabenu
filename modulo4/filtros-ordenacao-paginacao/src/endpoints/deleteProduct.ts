import { Request, Response } from "express";
import connection from "../database/connection";

export const deleteProduct = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        if(!id) {
            errorCode = 411
        }
        const [ check ] = await connection.raw(`
            SELECT * FROM Products1
            WHERE id = "${id}";
        `)
        if(check[0] === undefined) {
            errorCode = 404
            throw new Error("Id não encontrada");            
        }
        await connection.raw(`
        DELETE FROM Products1
        WHERE id = "${id}";
        `)
        res.status(201).send({mesage: "Produto excluído com sucesso!"})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}