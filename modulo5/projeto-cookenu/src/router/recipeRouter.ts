import { Router } from 'express'
import { RecipeController } from '../controller/RecipeController'

export const recipeRouter = Router()

const recipeController = new RecipeController()

recipeRouter.post("/create", recipeController.createRecipe)
recipeRouter.post("/edit/:id", recipeController.editRecipe)
recipeRouter.delete("/delete/:id", recipeController.deleteRecipe)
recipeRouter.get("/", recipeController.getRecipes)