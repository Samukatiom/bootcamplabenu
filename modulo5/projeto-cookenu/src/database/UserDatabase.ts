import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"
import { RecipeDatabase } from "./RecipeDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Cookenu_Users"

    public createUser = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public find = async (parameter : string, value : string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where(`${parameter}`, "=", `${value}`)
        
        return result[0]
    }

    public delete = async (id: string) => {
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .delete()
            .where({creator_id : id})
        
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({ id })
    }

    public getAllUsers = async () => {
        const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
        
        return result
    }
}