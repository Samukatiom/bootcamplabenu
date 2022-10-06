import { Request, Response } from "express";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { Recipe } from "../models/Recipe";
import { USER_ROLES } from "../models/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { CurrentDate } from "../utils/CurrentDate";

export class RecipeController {

    private static authenticator = new Authenticator()

    private static currentDate = new CurrentDate()

    private static recipeDatabase = new RecipeDatabase()

    public createRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization

            const { title, description } = req.body

            if (!title) {
                errorCode = 422
                throw new Error("Parametro 'title' faltando.");
            }
            if (!description) {
                errorCode = 422
                throw new Error("Paramentro 'description' faltando.'");
            }

            if (typeof title !== "string") {
                errorCode = 415
                throw new Error("O parametro 'title' deve ser uma string.");
            }
            if (typeof description !== "string") {
                errorCode = 415
                throw new Error("O parametro 'description' deve ser uma string.");
            }

            if (title.length < 3) {
                errorCode = 401
                throw new Error("O parametro 'title' deve ter ao menos 3 caracteres.");
            }
            if (description.length < 10) {
                errorCode = 401
                throw new Error("O parametro 'description' deve ter ao menos 6 caracteres.");
            }

            const payload = RecipeController.authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido");
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const recipe = new Recipe(
                id,
                title,
                description,
                new Date(RecipeController.currentDate.date),
                new Date(RecipeController.currentDate.date),
                payload.id
            )

            await RecipeController.recipeDatabase.createRecipe(recipe)

            res.status(201).send({ message: "Receita cadastrado com sucesso", recipe })

        } catch (error) {
            if (error.statusCode === 200) {
                res.status(500).end()
            } else {
                res.status(errorCode).send({ message: error.message })
            }
        }
    }

    public editRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization

            const { title, description } = req.body
            const id = req.params.id

            if (!title && !description) {
                errorCode = 422
                throw new Error("O body está vazio.");
            }

            if (!id) {
                errorCode = 422
                throw new Error("Paramentro 'id' faltando.'");
            }

            if (title && typeof title !== "string") {
                errorCode = 415
                throw new Error("O parametro 'title' deve ser uma string.");
            }
            if (description && typeof description !== "string") {
                errorCode = 415
                throw new Error("O parametro 'description' deve ser uma string.");
            }

            if (title && title.length < 3) {
                errorCode = 401
                throw new Error("O parametro 'title' deve ter ao menos 3 caracteres.");
            }
            if (description && description.length < 10) {
                errorCode = 401
                throw new Error("O parametro 'description' deve ter ao menos 6 caracteres.");
            }

            const recipeDB = await RecipeController.recipeDatabase.getRecipe(id)

            if (!recipeDB) {
                errorCode = 404
                throw new Error("Receita não encontrada.");
            }

            const payload = RecipeController.authenticator.getTokenPayload(token)

            // console.log(recipeDB)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido");
            }

            if (payload.role === USER_ROLES.NORMAL) {
                if (payload.id !== recipeDB.creator_id) {
                    errorCode = 403
                    throw new Error("Somente admins podem alterar outras contas além da prória")
                }
            }

            const recipe = new Recipe(
                recipeDB.id,
                recipeDB.title,
                recipeDB.description,
                recipeDB.created_at,
                recipeDB.updated_at,
                recipeDB.creator_id
            )

            title && recipe.setTitle(title)
            description && recipe.setDescription(description)
            recipe.setUpdatedAt(new Date(RecipeController.currentDate.date))

            await RecipeController.recipeDatabase.editRecipe(recipe)

            res.status(201).send({ message: "Receita atualizada com sucesso", recipe })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public deleteRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const id = req.params.id

            if (!id) {
                errorCode = 422
                throw new Error("Parametro 'id' faltando.");
            }

            const payload = RecipeController.authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 422
                throw new Error("Token inválido");
            }

            const recipeDB = await RecipeController.recipeDatabase.getRecipe(id)

            if (!recipeDB) {
                errorCode = 422
                throw new Error("Receita não encontrada.");
            }

            if (payload.role === USER_ROLES.NORMAL) {
                if (payload.id !== recipeDB.creator_id) {
                    errorCode = 403
                    throw new Error("Somente admins podem alterar outras contas além da prória")
                }
            }

            await RecipeController.recipeDatabase.deleteRecipe(id)

            res.status(202).send({ message: "Receita exlcuida com sucesso" })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public getRecipes = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization

            const payload = RecipeController.authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido");
            }

            const query = req.query.q as string
            const sort: string = "updated_at"
            const order = req.query.order as string || "asc"
            const limit = Number(req.query.limit) || 10
            const page = Number(req.query.page) || 1

            const offset = limit * (page - 1)

            if (order !== "asc" && order !== "desc") {
                throw new Error("A query'sort' pode receber dois valores: 'asc' ou 'desc'");
            }

            const recipe = await RecipeController.recipeDatabase.getRecipes(sort, order, offset, limit, query)

            if(recipe.length === 0) {
                const recipe = await RecipeController.recipeDatabase.getRecipes(sort, order, offset, limit)
                res.status(200).send({ message: "A receita pesquisada não foi encontrada, a baixo encontra-se todas as receitas cadastradas.", recipe })
            }

            res.status(200).send({ recipe })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}