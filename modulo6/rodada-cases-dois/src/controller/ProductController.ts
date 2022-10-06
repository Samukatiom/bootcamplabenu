import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseError } from "../errors/BaseError";
import { InputCreateProduct, GetProducts, InputCreateTags, InputEditProduct, InputDelete } from "../models/Products";

export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) { }

    public getAll = async (req: Request, res: Response) => {
        try {
            const input: GetProducts = {
                token: req.headers.authorization,
                sort: req.query.sort as string || "name",
                order: req.query.order as string || "asc",
                limit: Number(req.query.limit) || 10,
                page: Number(req.query.page) || 1
            }

            const response = await this.productBusiness.getAll(input)

            res.status(200).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public getByNameOrId = async (req: Request, res: Response) => {
        try {
            const input: GetProducts = {
                token: req.headers.authorization,
                query: req.query.q as string,
                sort: req.query.sort as string || "name",
                order: req.query.order as string || "asc",
                limit: Number(req.query.limit) || 10,
                page: Number(req.query.page) || 1
            }

            const response = await this.productBusiness.getByNameOrId(input)

            res.status(200).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public getByTag = async (req: Request, res: Response) => {
        try {
            const input: GetProducts = {
                token: req.headers.authorization,
                query: req.query.q as string,
                sort: req.query.sort as string || "name",
                order: req.query.order as string || "asc",
                limit: Number(req.query.limit) || 10,
                page: Number(req.query.page) || 1
            }

            const response = await this.productBusiness.getByTag(input)

            res.status(200).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public getTags = async (req: Request, res: Response) => {
        try {
            const response = await this.productBusiness.getTags(req.headers.authorization)
            res.status(200).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const input: InputCreateProduct = {
                token: req.headers.authorization,
                name: req.body.name ,
                tagsId: req.body.tagsId
            }

            const response = await this.productBusiness.create(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public createTag = async (req: Request, res: Response) => {
        try {
            const input: InputCreateTags = {
                token: req.headers.authorization,
                tags: req.body.tags
            }

            const response = await this.productBusiness.createTag(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public editProduct = async (req: Request, res: Response) => {
        try {
            const input: InputEditProduct = {
                token: req.headers.authorization,
                id: req.params.id,
                name: req.body.name
            }

            const response = await this.productBusiness.editProduct(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const input: InputDelete= {
                token: req.headers.authorization,
                id: req.params.id
            }

            const response = await this.productBusiness.delete(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public deleteRelation = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                tagId: req.params.tagId,
                productId: req.params.productId
            }

            const response = await this.productBusiness.deleteRelation(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }

    public deleteTag = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                id: req.params.id
            }

            const response = await this.productBusiness.deleteTag(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: error.message })
        }
    }
}