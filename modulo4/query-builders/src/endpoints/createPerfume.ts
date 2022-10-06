import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";
import { Perfume } from "../models/Perfume";

export const createPerfume = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        // input validation
        const { name, brand, price, ml } = req.body
        if(!name) {
            errorCode = 404
            throw new Error(" A propriedade 'name' não pode ser vazia.");
        }
        if(!brand) {
            errorCode = 404
            throw new Error(" A propriedade 'brand' não pode ser vazia.");
        }
        if(!price) {
            errorCode = 404
            throw new Error(" A propriedade 'price' não pode ser vazia.");
        }
        if(!ml) {
            errorCode = 404
            throw new Error(" A propriedade 'ml' não pode ser vazia.");
        }
        if(typeof name !== "string") {
            errorCode = 406
            throw new Error("A propriedade 'name' deve ser do tipo 'string'.");
        }
        if(typeof brand !== "string") {
            errorCode = 406
            throw new Error("A propriedade 'brand' deve ser do tipo 'string'.");
        }
        if(typeof price !== "number") {
            errorCode = 406
            throw new Error("A propriedade 'price' deve ser do tipo 'number'.");
        }
        if(typeof ml !== "number") {
            errorCode = 406
            throw new Error("A propriedade 'ml' deve ser do tipo 'number'.");
        }
        // Business roles
        if(name.length < 4) {
            errorCode = 406
            throw new Error("A propriedade 'name' deve ter no mínimo 4 caracteres");
        }
        if(brand.length < 4) {
            errorCode = 406
            throw new Error("A propriedade 'brand' deve ter no mínimo 4 caracteres");
        }
        if(price <= 0) {
            errorCode = 406
            throw new Error("A propriedade 'price' deve ser maior que 0");
        }
        if(ml <= 0) {
            errorCode = 406
            throw new Error("A propriedade 'ml' deve ser maior que 0");
        }
        const newPerfume : Perfume = {
            id : String(Date.now()),
            name,
            brand,
            price,
            ml
        }
        await connection(TABLE_PERFUMES)
            .insert(newPerfume)
        res.status(201).send({ message: "Perfume adicionado com sucesso.", newPerfume})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
} 