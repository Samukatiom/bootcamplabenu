import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";
import { addLeadingZero } from "../utils/addLeadingZero";

export const deletePerfumes = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = addLeadingZero(req.params.id)
        const checkExists = await connection(TABLE_PERFUMES)
            .select()
            .where({ id : id})
        if(checkExists.length === 0) {
            errorCode = 404
            throw new Error("Perfume não encontrado.")
        }
        await connection(TABLE_PERFUMES)
            .delete()
            .where({ id: id })
        res.status(201).send({message: "Perfume excluido com sucesso."})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}