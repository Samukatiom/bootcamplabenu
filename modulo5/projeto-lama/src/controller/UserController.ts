import { Request, response, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { inputLogin, inputSignup } from "../models/User";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        
        try {

            const input : inputSignup = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.signup(input)
            
            res.status(201).send(response)
        
        } catch (error) {

            if(error instanceof BaseError) {
                return res.status(error.statusCode).send({message: error.message})
            }

            res.status(500).send({message: error.message})
        }
    }

    public login = async (req: Request, res: Response) => {

        try {

            const input : inputLogin ={
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.login(input)

            res.status(201).send(response)

        } catch (error) {

            if(error instanceof BaseError) {
                return res.status(error.statusCode).send({message: error.message})
            }

            res.status(500).send({message: error.message})
        }
    }
}