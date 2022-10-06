import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Arq_Users"

    public createUser = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }
    
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })
        
        return result[0]
    }

    public getAllUsers = async () => {
        const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()

        return result
    }

    public findById = async (id: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ id })
        
        return result[0]
    }

    public deleteUserById = async (id: string) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({ id })
    }

}