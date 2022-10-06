import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";
import { Product } from "../models/Product";

export const registerProduct = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {name, price} = req.body
        // Input validations -- name
        if(!name) {
            errorCode = 404
            throw new Error("A propriedade 'name' está vazia!")
        }
        if(typeof name !== "string") {
            errorCode = 406
            throw new Error("A propriedade 'name' deve ser do tipo string.")
        }
        // Input validations -- price
        if(!price) {
            errorCode = 404
            throw new Error("A propriedade 'price' está vazia!")
        }
        if(typeof price !== "number") {
            errorCode = 406
            throw new Error("A propriedade 'price' deve ser do tipo number.")
        }
        // Bussiness rules -- name
        if(name.length < 4) {
            errorCode = 406
            throw new Error("A propriedade 'name' deve ter ao menos 4 caracteres.")
        }
        // Bussiness rules -- price
        if(price <= 0) {
            errorCode = 406
            throw new Error("A propriedade 'price' deve ser maior que 0")
        }
        const newProduct : Product = { id: `${Date.now()}`, name, price }
        await connection(TABLE_PRODUCTS)
            .insert(newProduct)
        res.status(201).send({message: "Produto criado com sucesso", newProduct})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}