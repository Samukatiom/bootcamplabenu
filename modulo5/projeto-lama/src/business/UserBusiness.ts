import { UserDatabase } from "../database/UserDatabase"
import { ConflictError } from "../errors/ConflictError"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { inputLogin, inputSignup, outputSignupOrLogin, User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}
    
    public signup = async (input : inputSignup) => {
        const { name, email, password } = input

        if(typeof name !== "string") {
            throw new RequestError("Parâmetro 'name' inválido: deve ser uma string")
        }

        if(typeof email !== "string") {
            throw new RequestError("Parâmetro 'email' inválido: deve ser uma string")
        }

        if(typeof password !== "string") {
            throw new RequestError("Parâmetro 'password' inválido: deve ser uma string")
        }

        if(name.length < 3) {
            throw new RequestError("Parâmetro 'name' inválido: deve ter ao menos 3 caracteres")
        }

        if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("Parâmetro 'email' inválido: deve ter as característica de email")
        }

        const isEmailAlreadyExists = await this.userDatabase.findByEmail(email) 

        if(isEmailAlreadyExists) {
            throw new ConflictError("Email já cadastro")
        }

        if(password.length < 6) {
            throw new RequestError("Parâmetro 'password' inválido: deve ter ao menos 6 caracteres")
        }

        const user = new User (
            this.idGenerator.generate(),
            name,
            email,
            await this.hashManager.hash(password),
            USER_ROLES.NORMAL
        )

        await this.userDatabase.signup(user)

        const payload : ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const response : outputSignupOrLogin = {
            message: "Cadastro realizado com sucesso",
            token: this.authenticator.generateToken(payload)
        }

        return response
    }

    public login = async (input: inputLogin) => {
        const {email, password} = input

        if(typeof email !== "string") {
            throw new RequestError("Parâmetro 'email' inválido: deve ser uma string")
        }

        if(typeof password !== "string") {
            throw new RequestError("Parâmetro 'password' inválido: deve ser uma string")
        }
        
        if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("Parâmetro 'email' inválido: deve ter as característica de email")
        }

        if(password.length < 6) {
            throw new RequestError("Parâmetro 'password' inválido: deve ter ao menos 6 caracteres")
        }

        const userDB = await this.userDatabase.findByEmail(email) 

        if(!userDB) {
            throw new ConflictError("Email inválido")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        if(! await this.hashManager.compare(password, user.getPassword())) {
            throw new UnauthorizedError("Email ou senha inválidos")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const response: outputSignupOrLogin = {
            message: "Login realizado com sucesso",
            token: this.authenticator.generateToken(payload)
        }

        return response
        
    }
}