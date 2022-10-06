import { IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Lama_Users"

    public toUserDBModel = (user: User): IUserDB => {
        const userDB: IUserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        return userDB
    }

    public findByEmail = async (email: string): Promise<IUserDB | undefined> => {
        const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })

        return result[0]
    }

    public signup = async (user: User) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(this.toUserDBModel(user))
    }
}