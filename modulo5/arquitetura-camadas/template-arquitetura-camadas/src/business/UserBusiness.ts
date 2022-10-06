import { UserDatabase } from "../database/UserDatabase";
import { User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    private static idGenerator = new IdGenerator()
    private static hashManager = new HashManager()
    private static userDatabase = new UserDatabase()
    private static authenticator = new Authenticator()

    public signup = async (input: any) => {
        const { name, email, password } = input

        if(!name || !email || !password) {
            throw new Error("Parâmetros faltando");
        }

        if(typeof name !== "string") {
            throw new Error("Parâmetro 'nickname' deve ser uma string")
        }

        if (typeof email !== "string") {
            throw new Error("Parâmetro 'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new Error("Parâmetro 'password' deve ser uma string")
        }

        if (name.length < 3) {
            throw new Error("O parâmetro 'nickname' deve possuir ao menos 3 caracteres")
        }

        if (password.length < 6) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        if (!email.includes("@") || !email.includes(".com")) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        const id = UserBusiness.idGenerator.generate()

        const hashPassword = await UserBusiness.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )

        await UserBusiness.userDatabase.createUser(user)

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = UserBusiness.authenticator.generateToken(payload)

        const response = {
            message: "Cadastro realizado com sucesso",
            token
        }

        return response
    }

    public login = async (input: any) => {
        const { email, password } = input
        
        if (!email || !password) {
            throw new Error("Email ou senha faltando")
        }

        if (typeof email !== "string") {
            throw new Error("Parâmetro 'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new Error("Parâmetro 'password' deve ser uma string")
        }

        if (password.length < 6) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        if (!email.includes("@") || !email.includes(".com")) {
            throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
        }

        const userDB = await UserBusiness.userDatabase.findByEmail(email)

        if (!userDB) {
            throw new Error("Email não cadastrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        const isPasswordCorrect = await UserBusiness.hashManager.compare(
            password,
            user.getPassword()
        )

        if (!isPasswordCorrect) {
            throw new Error("Senha inválida")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = UserBusiness.authenticator.generateToken(payload)

        const response = {
            message: "Login realizado com sucesso",
            token
        }

        return response

    }

    public getAllUser = async (input : any) => {
        const token = input

            const payload = UserBusiness.authenticator.getTokenPayload(token) 

            if(!payload) {
                throw new Error("Token inválido");
            }

            const userDB = await UserBusiness.userDatabase.getAllUsers()

            const users = userDB.map((userDB) => {
                return new User(
                    userDB.id,
                    userDB.nickname,
                    userDB.email,
                    userDB.password,
                    userDB.role
                )
            })
            
            return users
    }

    public deleteUser = async (input: any) => {
        const token = input.token
        const idToDelete = input.idToDelete

        if (!token) {
            throw new Error("Token faltando")
        }

        const payload = UserBusiness.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new Error("Somente admins podem deletar users")
        }

        const userDB = await UserBusiness.userDatabase.findById(idToDelete)

        if (!userDB) {
            throw new Error("User a ser deletado não existe")
        }

        const userToDelete = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        await UserBusiness.userDatabase.deleteUserById(userToDelete.getId())

        const response = {
            message: "User deletado com sucesso"
        }

        return response
    }
}