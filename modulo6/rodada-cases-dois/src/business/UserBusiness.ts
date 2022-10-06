import { UserDatabase } from "../database/UserDatabase";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { RequestError } from "../errors/RequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { InputChangeRole, InputDelete, InputLogin, InputSignup, OutputChangeRole, OutputSignup, User, USER_ROLES } from "../models/Users";
import { Authenticator, TokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public signup = async (input: InputSignup) => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new RequestError("Parâmetro 'name' inválido.")
        }
        if (typeof email !== "string") {
            throw new RequestError("Parâmetro 'email' inválido.")
        }
        if (typeof password !== "string") {
            throw new RequestError("Parâmetro 'password' inválido.")
        }

        if (name.length < 3) {
            throw new RequestError("O parâmentro 'name', deve ter ao mínimo 3 caracteres.")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("Parâmetro 'email' deve conter as características de email.")
        }

        const isEmailExists = await this.userDatabase.findBy("email", email)
        if (isEmailExists) {
            throw new ConflictError("Email já cadastrado.")
        }

        if (password.length < 6) {
            throw new RequestError("Parâmetro 'password' deve ter ao menos 6 carecteres")
        }

        const user = new User(
            this.idGenerator.generate(),
            name,
            email,
            await this.hashManager.hash(password)
        )

        await this.userDatabase.signup(user)

        const payload: TokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const output: OutputSignup = {
            message: "Cadastro realizado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole()
            },
            token: this.authenticator.generateToken(payload)
        }

        return output
    }

    public login = async (input: InputLogin) => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new RequestError("Parâmetro 'email' inválido.")
        }
        if (typeof password !== "string") {
            throw new RequestError("Parâmetro 'password' inválido.")
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("Parâmetro 'email' deve conter as características de email.")
        }

        const userDB = await this.userDatabase.findBy("email", email)
        if (!userDB) {
            throw new ConflictError("Email ou senha inválida.")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password
        )
        user.setRole(userDB.role)

        if (! await this.hashManager.compare(password, user.getPassword())) {
            throw new UnauthorizedError("Email ou senha inválida.")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const output = {
            message: "Login realizado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole()
            },
            token: this.authenticator.generateToken(payload)
        }

        return output
    }

    public changeRole = async (input: InputChangeRole) => {
        const { token, userId, role } = input

        const payload: TokenPayload = this.authenticator.getTokenPayload(token)

        if(!payload) {
            throw new UnauthorizedError("Não autenticado")
        }
        if(payload.role !== USER_ROLES.ADMIN) {
            throw new UnauthorizedError("Apenas admins podem alterar a autorização de usuários.")
        }

        const userDB = await this.userDatabase.findBy("id", userId)

        if(!userDB) {
            throw new NotFoundError("Usuário não encontrado.")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password
        )

        user.setRole(role)

        await this.userDatabase.changeRole(user.getId(), user.getRole())

        const output : OutputChangeRole = {
            message: `A permissão do usuário ${user.getName()} foi alterada para ${user.getRole()}`,
            user : {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole()
            }
        }

        return output
    }

    public delete = async (input: InputDelete) => {
        const {token, userId} = input

        const payload: TokenPayload = this.authenticator.getTokenPayload(token)

        if(!payload) {
            throw new UnauthorizedError("Não autenticado")
        }

        const userDB = await this.userDatabase.findBy("id", userId)

        if(!userDB) {
            throw new NotFoundError("Usuário não encontrado.")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password
        )
        user.setRole(userDB.role)

        if(payload.role !== USER_ROLES.ADMIN) {
            if(user.getId() !== payload.id) {
                throw new UnauthorizedError("Apenas admins podem excluir extras a do usuário.")
            }
        }
        await this.userDatabase.delete(user.getId())

        return {
            message: `Usuário ${user.getName()} excluído com sucesso.`
        }
    }
}