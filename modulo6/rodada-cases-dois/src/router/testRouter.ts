import {Router} from "express"
import { TestBusiness } from "../business/testBusiness"
import { TestController } from "../controller/testController"

export const testRouter = Router()

const testController = new TestController(
    new TestBusiness()
)

testRouter.get("/", testController.ping)