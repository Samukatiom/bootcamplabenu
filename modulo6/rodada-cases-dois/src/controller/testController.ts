import { Request, Response } from "express";
import { TestBusiness } from "../business/testBusiness";
import { BaseError } from "../errors/BaseError";

export class TestController {
    constructor(
        private testBusiness: TestBusiness
    ) {}
    public ping = async (req: Request, res: Response) => {
        try {
            const response = await this.testBusiness.ping()
            
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
        }
    }
}