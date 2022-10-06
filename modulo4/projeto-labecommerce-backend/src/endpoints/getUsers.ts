import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_USERS } from "../database/tableNames";

export const getUsers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const sort = req.query.sort || 'id'
        const order = req.query.order || 'asc'
        // Input validations -- sort
        if(sort !== 'id' && sort !== 'email') {
            errorCode = 406
            throw new Error("'sort' pode receber apenas os seguintes valores : 'id', e 'email'.")
        }
        // Input validations -- sort
        if(order !== 'asc' && order !== 'desc') {
            errorCode = 406
            throw new Error("'order' pode receber apenas os seguintes valores : 'asc' e 'desc'.")
        }
        const result = await connection(TABLE_USERS)
            .select('id', 'email')
            .orderBy(`${sort}`, `${order}`)
        res.status(200).send({message: "Usuários econtrados!", result})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}