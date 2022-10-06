import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS, TABLE_PURCHASES, TABLE_USERS } from "../database/tableNames";

export const getPurchasesByUsers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const user_id = req.params.user_id
        const sort = req.query.sort || 'id' 
        const order = req.query.order || 'asc'
        const sortModified = (sort : any) => {
            switch(sort) {
                case 'id':
                    return `${TABLE_PURCHASES}.id`
                case 'name':
                    return `${TABLE_PRODUCTS}.name`
                case 'total_price':
                    return `${TABLE_PURCHASES}.total_price`
                case 'quantity':
                    return `${TABLE_PURCHASES}.quantity`
                default:
                    break
            }
        }
        // Input validations -- sort
        if(sort !== 'id' && sort !== 'name' && sort !== 'total_price' && sort !== 'quantity') {
            errorCode = 406
            throw new Error("'sort' pode receber apenas os seguintes valores : 'id', 'name', 'total_price' e 'quantity'")
        }
        // Input validations -- sort
        if(order !== 'asc' && order !== 'desc') {
            errorCode = 406
            throw new Error("'order' pode receber apenas os seguintes valores : 'asc' e 'desc'")
        }
        // Bussiness rules -- user_id
        const checkUser = await connection(TABLE_PRODUCTS)
            .select()
            .where("id", "=", `${user_id}`)
        if (checkUser.length === 0) {
            errorCode = 404
            throw new Error("Usuário não encontrado!")
        }
        const result = await connection(TABLE_PURCHASES)
            .select('email', 'name', 'quantity', 'total_price')
            .orderBy(`${sortModified(sort)}`, `${order}`)
            .innerJoin(TABLE_USERS, `${TABLE_USERS}.id`, `${TABLE_PURCHASES}.user_id`)
            .innerJoin(TABLE_PRODUCTS, `${TABLE_PRODUCTS}.id`, `${TABLE_PURCHASES}.product_id`)
            .where(`${TABLE_USERS}.id`, "=", `${user_id}`)
        res.status(200).send({message: "Compras encotradas!", result})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}