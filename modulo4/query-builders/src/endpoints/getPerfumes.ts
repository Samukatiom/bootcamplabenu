import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const getPerfumes = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const query = req.query.q
        const sort = req.query.sort || "id"
        const order = req.query.order || "asc"
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const offset = limit * (page - 1)
        if(query) {
            const checkExists = await connection(TABLE_PERFUMES)
            .select()
            .where("id", "LIKE", `%${query}%`)
            .orWhere("name", "LIKE", `%${query}%`)
            .orWhere("brand", "LIKE", `%${query}%`)
        if(checkExists.length === 0) {
            errorCode = 404
            throw new Error("Perfume não encontrado.")
        }
            const result = await connection(TABLE_PERFUMES)
                .select()
                .where("id", "LIKE", `%${query}%`)
                .orWhere("name", "LIKE", `%${query}%`)
                .orWhere("brand", "LIKE", `%${query}%`)
                .orderBy(`${sort}`, `${order}`)
                .limit(limit)
                .offset(offset)
               return res.status(200).send({message: "Perfume(s) encontrado(s) com sucesso", result})
        }
         const result = await connection(TABLE_PERFUMES)
            .select()
            .orderBy(`${sort}`, `${order}`)
            .limit(limit)
            .offset(offset)
        res.status(200).send({message: "Perfumes encontrado com sucesso!", result})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}