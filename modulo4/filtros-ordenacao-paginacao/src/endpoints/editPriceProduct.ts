import { Request, Response } from "express";
import connection from "../database/connection";

export const editPriceProduct = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        const price = Number(req.body.price)
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
        if(typeof price !== "number") {
            errorCode = 406
            throw new Error("'price' deve ser do tipo 'number'");  
        }
        if(price <= 0) {
            errorCode = 406
            throw new Error("'price' deve ser maior que 0");
        }
        await connection.raw(`
        UPDATE Products1
        SET price = ${price}
        WHERE id = "${id}";
        `)
        res.status(201).send({message: "Preço alterado com sucesso!"})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}