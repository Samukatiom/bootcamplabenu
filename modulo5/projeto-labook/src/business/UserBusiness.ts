import { UserDatabase } from "../database/UserDatabase"
import { IloginDTO, ISignupDTO, User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { RegexEmail } from "../utils/Regex"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public signup = async (input: ISignupDTO) => {
        const { name, email, password } = input

        if (!name) {
            throw new Error("O parametro 'name' está vazio.");
        }

        if (!email) {
            throw new Error("O paramentro 'email' está vazio.");
        }

        if (!password) {
            throw new Error("O parametro 'password' está vazio.");
        }

        if (typeof name !== "string") {
            throw new Error("O parametro 'name' deve ser do tipo 'string'.");
        }

        if (typeof email !== "string") {
            throw new Error("O parametro 'email' deve ser do tipo 'string'.");
        }

        if (typeof password !== "string") {
            throw new Error("O parametro 'password' deve ser do tipo 'string'.");
        }

        if (name.length < 3) {
            throw new Error("O paramentro 'name' deve ter ao menos 3 caracteres.");
        }

        if (password.length < 6) {
            throw new Error("O paramentro 'password' deve ter ao menos 6 caracteres.");
        }

        const validEmail = new RegexEmail()

        if (!validEmail.regexEmail(email)) {
            throw new Error("Email inválido.");
        }

        const findByEmail = await this.userDatabase.findByEmail(email)

        if (findByEmail) {
            throw new Error("O email já está em uso.");
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )

        await this.userDatabase.signup(user)

        const payload: ITokenPayload = { id: user.getId(), role: user.getRole() }

        const token = this.authenticator.generateToken(payload)

        return { message: "Cadastro realizado com sucesso.", token }
    }

    public login = async (input: IloginDTO) => {
        const { email, password } = input

        if (!email) {
            throw new Error("O paramentro 'email' está vazio.");
        }

        if (!password) {
            throw new Error("O parametro 'password' está vazio.");
        }

        if (typeof email !== "string") {
            throw new Error("O parametro 'email' deve ser do tipo 'string'.");
        }

        if (typeof password !== "string") {
            throw new Error("O parametro 'password' deve ser do tipo 'string'.");
        }

        if (password.length < 6) {
            throw new Error("O paramentro 'password' deve ter ao menos 6 caracteres.");
        }

        const validEmail = new RegexEmail()

        if (!validEmail.regexEmail(email)) {
            throw new Error("Email inválido.");
        }

        const userDB = await this.userDatabase.findByEmail(email)

        // console.log(userDB)

        if(!userDB) {
            throw new Error("Email ou senha inválida.");
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())

        if (!isPasswordCorrect) {
            throw new Error("Email ou senha incorreta!");
        }

        const payload: ITokenPayload = { id: user.getId(), role: user.getRole() }

        const token = this.authenticator.generateToken(payload)

        return { message: "Login realizado com sucesso.", token }
    }
}