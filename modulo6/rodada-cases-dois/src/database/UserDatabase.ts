import { User, UserDB, USER_ROLES } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Amaro_Users"
    public static TABLE_USERS_PRODUCTS = "Amaro_Users_Products"

    public toUserDBModel = (user: User): UserDB  => {
        const userDB: UserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }
        return userDB
    }

    public findBy = async (paramenter: string, where: string): Promise<UserDB | undefined> => {
        const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where(`${paramenter}`, "=", `${where}`)
        return result[0]
    }

    public signup = async (user: User) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(this.toUserDBModel(user))
    }

    public changeRole = async (id: string, role: USER_ROLES) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update({role})
            .where({id})
    }

    public delete = async (id: string) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({id})
    }
}