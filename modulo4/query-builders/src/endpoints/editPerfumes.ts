import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";
import { addLeadingZero } from "../utils/addLeadingZero";

export const editPerfumes = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = addLeadingZero(req.params.id)
        const price = req.body.price
        const checkExists = await connection(TABLE_PERFUMES)
            .select()
            .where({ id: id })
        if(checkExists.length === 0) {
            errorCode = 404
            throw new Error("Perfume não encontrado.")
        }
        if(typeof price !== "number") {
            errorCode = 406
            throw new Error("A propriedade 'price' deve ser do tipo 'number'.");
        }
        if(price <= 0) {
            errorCode = 406
            throw new Error("A propriedade 'price' deve ser maior que 0");
        }
        await connection(TABLE_PERFUMES)
            .update({ price: price })
            .where({ id : id })
            res.status(201).send({message: "Preço atualizado."})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}