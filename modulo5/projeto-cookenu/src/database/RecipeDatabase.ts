import { IRecipeDB, Recipe } from "../models/Recipe";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class RecipeDatabase extends BaseDatabase {
    public static TABLE_RECIPES = "Cookenu_Recipes"

    public createRecipe = async (recpipe : Recipe) => {
        const recipeDB: IRecipeDB = {
            id: recpipe.getId(),
            title: recpipe.getTitle(),
            description: recpipe.getDescription(),
            created_at: recpipe.getCreatedAt(),
            updated_at: recpipe.getUpdatedAt(),
            creator_id: recpipe.getCreatorId()
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .insert(recipeDB)
    }

    public getRecipe = async ( id : string ) => {
        const result = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select()
            .where({ id })
        
        return result[0]
    }

    public editRecipe = async (recipe : Recipe) => {
        const recipeDB: IRecipeDB = {
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            created_at: recipe.getCreatedAt(),
            updated_at: recipe.getUpdatedAt(),
            creator_id: recipe.getCreatorId()
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .update(recipeDB)
            .where({id : recipeDB.id})
    }

    public deleteRecipe = async (id : string) => {
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .delete()
            .where({ id })
    }

    public getRecipes = async (
        sort: string,
        order: string,
        offset: number,
        limit: number,
        query?: string,
        ) => {

        if(!query) {
            const result = await BaseDatabase
                .connection(RecipeDatabase.TABLE_RECIPES)
                .select(`${RecipeDatabase.TABLE_RECIPES}.id` ,"nickname", "title", "description", "created_at as createdAt" , "updated_at as updatedAt")
                .orderBy(`${sort}`, `${order}`)
                .innerJoin(UserDatabase.TABLE_USERS, `${UserDatabase.TABLE_USERS}.id`, `${RecipeDatabase.TABLE_RECIPES}.creator_id`)
                .limit(limit)
                .offset(offset)

            return result
        }

        const result = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select("nickname", "title", "description", "created_at as createdAt" , "updated_at as updatedAt")
            .orderBy(`${sort}`, `${order}`)
            .innerJoin(UserDatabase.TABLE_USERS, `${UserDatabase.TABLE_USERS}.id`, `${RecipeDatabase.TABLE_RECIPES}.creator_id`)
            .where("title", "LIKE", `%${query}%`)
            .limit(limit)
            .offset(offset)

        return result
    }
}