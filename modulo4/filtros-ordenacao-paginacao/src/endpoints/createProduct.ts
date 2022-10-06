import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";
import { Product } from "../models/Product"

export const createProducts = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {name, price} = req.body
        if(!name) {
            errorCode = 411
            throw new Error("'name' deve existir");            
        }
        if(!price) {
            errorCode = 411
            throw new Error("'price' deve existir");
        }
        if(typeof name !== "string") {
            errorCode = 406
            throw new Error("'name' deve ser do tipo 'string'");
        }
        if(typeof price !== "number") {
            errorCode = 406
            throw new Error("'price' deve ser do tipo 'number'");  
        }
        if(name.length < 5) {
            errorCode = 406
            throw new Error("'name' deve ter ao menos 5 caracteres");
        }
        if(price <= 0) {
            errorCode = 406
            throw new Error("'price' deve ser maior que 0");
        }
        const newProduct : Product = {
            id: `product${Date.now()}`,
            name,
            price
        }
        await connection.raw(`
        INSERT INTO 
        Products1
        ( id, name, price )
        VALUES
        ( "${newProduct.id}","${newProduct.name}",${newProduct.price} ); 
        `)
        res.send({message: "Produto criado com sucesso", newProduct})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}