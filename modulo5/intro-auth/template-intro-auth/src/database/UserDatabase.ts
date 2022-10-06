import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Auth_Users"

    public createUser = async (user: User) => {
        
        const userDB : IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword()
        }
        
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({email})

        return result[0]
    }

    public getAllUsers = async () => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
        
        return result
    }

    public getUserById = async(id : string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({id})
        
        return result[0]
    }

    public editUser = async (user : User) => {

        const userDB : IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword()
        }

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update({
                nickname: userDB.nickname,
                email: userDB.email,
                password: userDB.password
            })
            .where({id: userDB.id})
    }

    public delete = async (id: string) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({id})
    }
}