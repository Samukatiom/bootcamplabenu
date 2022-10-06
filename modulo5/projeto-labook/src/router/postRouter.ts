import { Router } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostDatabase } from '../database/PostDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const postRouter = Router()

const postController = new PostController(
    new PostBusiness (
        new PostDatabase(),
        new IdGenerator(),
        new Authenticator()
    )
)

postRouter.post("/create", postController.create)
postRouter.get("/", postController.getAllPost)
postRouter.delete("/:id", postController.delete)
postRouter.post("/like/:id", postController.like)
postRouter.delete("/like/:id", postController.removeLike)