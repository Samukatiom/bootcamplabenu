import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { InputChangeRole, InputDelete, InputLogin, InputSignup } from "../models/Users";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input: InputSignup = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.signup(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: InputLogin = {
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.login(input)

            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: error.message })
        }
    }

    public changeRole = async (req: Request, res: Response) => {
        try {
            const input: InputChangeRole = {
                token: req.headers.authorization,
                userId: req.params.userId,
                role: req.body.role
            }

            const response = await this.userBusiness.changeRole(input)

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
            const input: InputDelete = {
                token: req.headers.authorization,
                userId: req.params.userId
            }
            const response = await this.userBusiness.delete(input)
            res.status(201).send(response)
        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: error.message })
        }
    }
}
