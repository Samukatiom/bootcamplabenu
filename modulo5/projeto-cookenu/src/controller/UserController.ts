import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { regexEmail } from "../utils/RegexEmail";

export class UserController {

    private static idGenerator = new IdGenerator()
    
    private static hashManager = new HashManager()

    private static userDatabase = new UserDatabase()

    private static authenticator = new Authenticator()

    private static validEmail = new regexEmail()

    public signup = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const {nickname , email, password} = req.body

            if(!nickname) {
                errorCode = 422
                throw new Error("Paramentro 'nickname' faltando.");
            }
            if(!email) {
                errorCode = 422
                throw new Error("Paramentro 'email' faltando.");
            }
            if(!password) {
                errorCode = 422
                throw new Error("Paramentro 'password' faltando.");
            }

            if (typeof nickname !== "string") {
                errorCode = 415
                throw new Error("Parâmetro 'nickname' deve ser uma string")
            }
            if (typeof email !== "string") {
                errorCode = 415
                throw new Error("Parâmetro 'email' deve ser uma string")
            }
            if (typeof password !== "string") {
                errorCode = 415
                throw new Error("Parâmetro 'password' deve ser uma string")
            }

            if (nickname.length < 3) {
                errorCode = 415
                throw new Error("O parâmetro 'nickname' deve possuir ao menos 3 caracteres")
            }
            if (password.length < 6) {
                errorCode = 415
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }

            // console.log(emailRegex(email))

            if (!UserController.validEmail.regexEmail(email)) {
                errorCode = 422
                throw new Error("Email inválido!")
            }

            const findByEmail = await UserController.userDatabase.find("email", email)
            if(findByEmail) {
                errorCode = 403
                throw new Error("Este email já está em uso.");
            }

            const findByNickname = await UserController.userDatabase.find("nickname", nickname)
            if(findByNickname) {
                errorCode = 403
                throw new Error("Este nickname já está em uso.");
                
            }

            const id = UserController.idGenerator.generate()

            const hashPassword = await UserController.hashManager.hash(password)

            const user = new User(
                id,
                nickname,
                email,
                hashPassword,
                USER_ROLES.NORMAL
            )

            await UserController.userDatabase.createUser(user)

            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }

            const token = UserController.authenticator.generateToken(payload)

            res.status(201).send({
                message: "Cadastro realizado com sucesso",
                token
            })
            
        } catch (error) {
            if (error.statusCode === 200) {
                res.status(500).end()
            } else {
                res.status(errorCode).send({ message: error.message })
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const email = req.body.email
            const password = req.body.password

            if(!email) {
                errorCode = 422
                throw new Error("Paramentro 'email' faltando.");
            }
            if(!password) {
                errorCode = 422
                throw new Error("Paramentro 'password' faltando.");
            }

            if (typeof email !== "string") {
                errorCode = 415
                throw new Error("Parâmetro 'email' deve ser uma string")
            }
            if (typeof password !== "string") {
                errorCode = 415
                throw new Error("Parâmetro 'password' deve ser uma string")
            }
            if (password.length < 6) {
                errorCode = 415
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }

            if (!UserController.validEmail.regexEmail(email)) {
                errorCode = 415
                throw new Error("Email inválido!")
            }

            const userDB = await UserController.userDatabase.find("email", email)

            if (!userDB) {
                errorCode = 415
                throw new Error("Email não cadastrado")
            }

            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password,
                userDB.role
            )

            const isPasswordCorrect = await UserController.hashManager.compare(
                password,
                user.getPassword()
            )

            if (!isPasswordCorrect) {
                errorCode = 403
                throw new Error("Senha inválida")
            }

            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }

            const token = UserController.authenticator.generateToken(payload)

            res.status(200).send({
                message: "Login realizado com sucesso",
                token
            })

        } catch (error) {
            if (error.statusCode === 200) {
                res.status(500).end()
            } else {
                res.status(errorCode).send({ message: error.message })
            }
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        let errorCode = 400

        try {
            const token = req.headers.authorization
            
            const id = req.params.id

            if(!id) {
                errorCode = 422
                throw new Error("Paramentro 'id' faltando."); 
            }

            const findById = await UserController.userDatabase.find("id", id)

            if(!findById) {
                errorCode = 422
                throw new Error("Usuário não encontrado.")
            }

            const payload = UserController.authenticator.getTokenPayload(token)

            if(!payload) {
                errorCode = 422
                throw new Error("Token inválido");
            }

            if(payload.role !== USER_ROLES.ADMIN) {
                errorCode = 403
                throw new Error("Somente admins podem acessar esse endpoint");
            }

            if (id === payload.id) {
                errorCode = 403
                throw new Error("Você não pode deletar a conta que está logado");
            }

            await UserController.userDatabase.delete(id)

            res.status(201).send({message: "Usuário excluído com sucesso!"})
            
        } catch (error) {
            if (error.statusCode === 200) {
                res.status(500).end()
            } else {
                res.status(errorCode).send({ message: error.message })
            }
        }
    }

    public getAllUser = async (req: Request, res: Response) => {
        let errorCode = 400

        try {
            const token = req.headers.authorization

            const payload = UserController.authenticator.getTokenPayload(token) 

            if(!payload) {
                errorCode = 422
                throw new Error("Token inválido");
            }
            
            const userDB = await UserController.userDatabase.getAllUsers()

            const usersForAdmin = userDB.map((userDB) => {
                return new User(
                    userDB.id,
                    userDB.nickname,
                    userDB.email,
                    userDB.password,
                    userDB.role
                )
            })

            if( payload.role !== USER_ROLES.ADMIN) {
                const users = usersForAdmin.map((user) => {
                    return user.getNickname()
                })

                res.status(200).send({users})
            }

            res.status(200).send({usersForAdmin})
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}