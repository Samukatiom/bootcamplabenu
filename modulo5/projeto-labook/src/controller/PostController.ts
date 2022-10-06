import { Request, response, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ICreatePostDTO, IDeleteAndLikePostsDTO } from "../models/Post";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input: ICreatePostDTO = { content: req.body.content, token: req.headers.authorization }

            const response = await this.postBusiness.create(input)

            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public getAllPost = async (req: Request, res: Response) => {
        try {
            const response = await this.postBusiness.getAllPosts(req.headers.authorization)

            res.status(200).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const input: IDeleteAndLikePostsDTO = { id: req.params.id, token: req.headers.authorization }

            const response = await this.postBusiness.delete(input)

            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public like = async (req: Request, res: Response) => {
        try {
            const input : IDeleteAndLikePostsDTO = { id: req.params.id, token: req.headers.authorization }

            const response = await this.postBusiness.like(input)

            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public removeLike = async (req: Request, res: Response) => {
        try {
            const input : IDeleteAndLikePostsDTO = { id: req.params.id, token: req.headers.authorization}
            
            const response = await this.postBusiness.removeLike(input)

            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}