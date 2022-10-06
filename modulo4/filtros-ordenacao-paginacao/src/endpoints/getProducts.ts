import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const getProducts = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const query = req.query.q
        const sort = req.query.sort || "price"
        const order = req.query.order || "asc"
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const offset : number = limit * (page - 1)
        const [ check ] = await connection.raw(`
            SELECT * FROM ${TABLE_PRODUCTS}
            WHERE name LIKE "%${query}%";
        `)
        if(check[0]) {
            errorCode = 404
            throw new Error("Produto não encontrado");
        }
        if(order !== "desc" && order !== "asc") {
            errorCode = 406
            throw new Error("'order' deve ser 'asc' ou 'desc'");
        }
        if(sort !== "id" && sort !== "price" && sort !== "name") {
            errorCode = 406
            throw new Error("'sort' deve ser 'id', 'name' ou 'desc'");
        }
        if (query) {
            const [result] = await connection.raw(`
                SELECT * FROM ${TABLE_PRODUCTS}
                WHERE name LIKE "%${query}%"
                ORDER BY ${sort} ${order}
                LIMIT ${limit}
                OFFSET ${offset};
            `)
            return res.status(200).send({ message: "Produtos encontrado com sucesso!", result })
        }
        const [result] = await connection.raw(`
            SELECT * FROM ${TABLE_PRODUCTS}
            ORDER BY ${sort} ${order}
            LIMIT ${limit}
            OFFSET ${offset};
        `)
        res.status(200).send({ message: "Produtos encontrado com sucesso!", result })
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}