import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseError } from "../errors/BaseError";
import { inputBookOrDeleteTicket, inputCreateShow } from "../models/Show";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    public create = async (req: Request, res: Response) => {
        try {
            const input: inputCreateShow = { token: req.headers.authorization, band: req.body.band, startsAt: req.body.startsAt }

            const response = await this.showBusiness.create(input)

            res.status(201).send(response)

        } catch (error: unknown) {

            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao cadastrar usuário" })
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const response = await this.showBusiness.getAll()

            res.status(200).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao buscar os shows" })
        }
    }

    public bookTicket = async (req: Request, res: Response) => {
        try {
            const input: inputBookOrDeleteTicket = { token: req.headers.authorization, showId: req.params.showId }

            const response = await this.showBusiness.bookTicket(input)

            res.status(201).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao tentar reservar o ingresso" })
        }
    }

    public deleteReservation = async (req: Request, res: Response) => {
        try {
            const input: inputBookOrDeleteTicket = { token: req.headers.authorization, showId: req.params.showId }

            const response = await this.showBusiness.deleteReservation(input)

            res.status(201).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao tentar desreservar o ingresso" })
        }
    }
}