import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    // Endpoint de de criação de usuário
    // Nele você recebe o nickname, email e senha do novo usuário.
    // Caso sucesso: mensagem de sucesso e um token de acesso.
    // A api é responsável por gerar automáricamente a id, a qual está sendo gerada pela ferramenta UUID - V4
    // Validações e regras: nickname, email, senha devem ser do tipo string,
    // nickname deve ter ao menos 3 caracteres, enquanto o password deve ter ao menos 6 caracteres,
    // o email deve ser único, e também deve ter o formato válido.
    public signup = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { nickname, email, password } = req.body

            if (!nickname) {
                errorCode = 401
                throw new Error("O paramentro 'nickname' está vazio!");
            }
            if (!email) {
                errorCode = 401
                throw new Error("O paramentro 'email' está vazio!");
            }
            if (!password) {
                errorCode = 401
                throw new Error("O paramentro 'password' está vazio!");
            }

            if (typeof nickname !== "string") {
                throw new Error("Parâmetro 'nickname' deve ser uma string")
            }

            if (typeof email !== "string") {
                throw new Error("Parâmetro 'email' deve ser uma string")
            }

            if (typeof password !== "string") {
                throw new Error("Parâmetro 'password' deve ser uma string")
            }

            if (nickname.length < 3) {
                throw new Error("O parâmetro 'nickname' deve possuir ao menos 3 caracteres")
            }

            if (password.length < 6) {
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }

            if (!email.includes("@") || !email.includes(".com")) {
                throw new Error("Email dever conter @ e . ")            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const hashManager = new HashManager()
            const hashPassword = await hashManager.hash(password)

            const user = new User(
                id,
                nickname,
                email,
                hashPassword,
                USER_ROLES.NORMAL
            )

            const userDatabase = new UserDatabase()
            await userDatabase.createUser(user)

            // inicio da geração do token
            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)
            // fim da geração do token

            res.status(201).send({ message: "Cadastro realizado com sucesso!", token })


        } catch (error) {
            if (typeof error.message === "string" && error.message.includes("Duplicate entry")) {
                return res.status(400).send("Email already taken")
            }
            res.status(errorCode).send({ message: error.message })
        }
    }

    // Endpoint para realizar um login do usuário
    // nele recebemos email e password, e então verificamos a existencia do email
    // no DB, caso exista verificamos a autenticidade da senha,
    // e então se a autenticidade for verdadeira devolvemos o token do usuário.
    public login = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { email, password } = req.body

            if (!email) {
                errorCode = 401
                throw new Error("O paramentro 'email' está vazio!");
            }
            if (!password) {
                errorCode = 401
                throw new Error("O paramentro 'password' está vazio!");
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
                throw new Error("Email dever conter @ e . ")            }

            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.findByEmail(email)

            if (!userDB) {
                errorCode = 401
                throw new Error("Email não foi cadastrado");
                // throw new Error("Email ou senha inválido"); maneira mais segura
            }

            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password,
                userDB.role
            )

            const hashManager = new HashManager()
            const isPasswordCorrect = await hashManager.compare(password,  user.getPassword())
            
            console.log(await hashManager.hash("bananinha"))
            console.log(await hashManager.hash("qwerty00"))
            console.log(await hashManager.hash("asdfg123"))

            if (!isPasswordCorrect) {
                errorCode = 401
                throw new Error("Senha inválida");
                // throw new Error("Email ou senha inválido"); maneira mais segura
            }

            // inicio da geração do token
            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)
            // final da geração do token

            res.status(200).send({ message: "Login realizado com sucesso", token })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    // Endpoin protegiod para buscar todos os usuários 
    public getAllUsers = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization

            // inicio de verificação de token
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            // console.log(payload.id)

            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando ou inválido");
            }
            // final de verificação de token

            const userDatabese = new UserDatabase()
            const userDB = await userDatabese.getAllUsers()

            const user = userDB.map((user) => {
                return new User(
                    user.id,
                    user.nickname,
                    user.email,
                    user.password,
                    user.role
                )
            })

            res.status(200).send({ user })

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
    // Endpoin protegido para editar dados do usuário
    public editDataUsers = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { nickname, email, password } = req.body
            const id = req.params.id

            if (!nickname && !email && !password) {
                errorCode = 401
                throw new Error("Todos os paramentros vieram vazios");
            }

            if (typeof nickname !== "string") {
                throw new Error("Parâmetro 'nickname' deve ser uma string")
            }

            if (typeof email !== "string") {
                throw new Error("Parâmetro 'email' deve ser uma string")
            }

            if (typeof password !== "string") {
                throw new Error("Parâmetro 'password' deve ser uma string")
            }

            if ( nickname.length < 3) {
                throw new Error("O parâmetro 'nickname' deve possuir ao menos 3 caracteres")
            }

            if (password.length < 6) {
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }

            if (!email.includes("@") || !email.includes(".")) {
                throw new Error("Email dever conter @ e . ")
            }


            // inicio de verificação de token
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            // console.log(payload.role)

            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando ou inválido");
            }

            if(payload.id !== id) {

                if(payload.role !== USER_ROLES.ADMIN) {
                    errorCode = 403
                    throw new Error("Somente admins podem alterar os dados de outra conta");
                }
                else {
                    const userDatabase = new UserDatabase()

                    const userDB = await userDatabase.getUserById(id)
        
        
                    if (!nickname && !email && !password) {
                        errorCode = 401
                        throw new Error("Todos os paramentros vieram vazios");
                    }
        
                    const user = new User(
                        userDB.id,
                        nickname,
                        email,
                        password,
                        userDB.role
                    )
        
                    await userDatabase.editUser(user)
                }
            }

            // final de verificação de token

            const userDatabase = new UserDatabase()

            const userDB = await userDatabase.getUserById(id)

            const user = new User(
                userDB.id,
                nickname,
                email,
                password,
                userDB.role
            )

            await userDatabase.editUser(user)

            res.status(201).send({ messsage: "Dados atualizados com sucesso!", user })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
    public deleteUserById = async (req: Request, res: Response) => {
        let errorCode = 400

        try {
            const token = req.headers.authorization
            const id = req.params.id
    
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if(payload.role !== USER_ROLES.ADMIN) {
                errorCode = 403
                throw new Error("Somente admins podem acessar esse endpoint");
            }
    
            if(id === payload.id) {
                errorCode = 403
                throw new Error("Você não pode deletar a conta que está logado");
            }

            const userDatabase = new UserDatabase()
            await userDatabase.delete(id)
            res.status(201).send({ messsage: "Usuário excluido com sucesso!" })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
            
        }

        
    }
}