import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {

    private static userBusiness = new UserBusiness()

    public signup = async (req: Request, res: Response) => {
        try {
            const dataSignup = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response = await UserController.userBusiness.signup(dataSignup)

            res.status(201).send(response)

        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const dataLogin = {
                email: req.body.email,
                password: req.body.password
            }

            const response = await UserController.userBusiness.login(dataLogin)

            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    public getAllUser = async (req: Request, res: Response) => {

        try {
            const response = await UserController.userBusiness.getAllUser(req.headers.authorization)

                res.status(200).send({response})

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const response = await UserController.userBusiness.deleteUser({
                token: req.headers.authorization,
                idToDelete: req.params.id
            })

            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}