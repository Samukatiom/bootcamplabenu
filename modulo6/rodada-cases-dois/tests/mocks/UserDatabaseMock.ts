import { User, UserDB, USER_ROLES } from "../../src/models/Users";
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class UserDatabaseMock extends BaseDatabase {
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
        if(paramenter === "email") {
            switch(where) {
                case "astrodev@gmail.com":
                    return {
                        id: "101",
                        name: "Astrodev",
                        email: "astrodev@gmail.com",
                        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
                        role: USER_ROLES.ADMIN
                    } as UserDB
                default:
                    return undefined
            }
        } else if(paramenter === "id") {
            switch(where) {
                case "101":
                    return {
                        id: "101",
                        name: "Astrodev",
                        email: "astrodev@gmail.com",
                        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
                        role: USER_ROLES.ADMIN
                    } as UserDB
                case "102":
                    return {
                        id: "102",
                        name: "AstroTeste",
                        email: "astroteste@gmail.com",
                        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
                        role: USER_ROLES.NORMAL
                    } as UserDB
                default:
                    return undefined
            }
        }
    }

    public signup = async (user: User) => {

    }

    public changeRole = async (id: string, role: USER_ROLES) => {

    }

    public delete = async (id: string) => {

    }
}