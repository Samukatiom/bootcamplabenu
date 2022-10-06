import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { InputChangeRole, User, USER_ROLES } from "../../src/models/Users"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testes da Userbusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )
    test("Troca de autorização realizada com sucesso", async () => {
        const input: InputChangeRole = {
            token: "token-astrodev",
            userId: "101",
            role: USER_ROLES.ADMIN
        }

        const user = new User(
            "101",
            "Astrodev",
            "astrodev@gmail.com",
            "12345"
        )
        user.setRole(input.role)

        const response = await userBusiness.changeRole(input)

        expect(response.message).toEqual(`A permissão do usuário ${user.getName()} foi alterada para ${user.getRole()}`)
        expect(response.user).toEqual({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            role: user.getRole()
        })
    })

    test("Deve retornar erro caso o usuário não estiver autenticado", async () => {
        expect.assertions(2)
        try {
            const input: InputChangeRole = {
                token: "",
                userId: "101",
                role: USER_ROLES.ADMIN
            }

            await userBusiness.changeRole(input)
            
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o usuário não for admin", async () => {
        expect.assertions(2)
        try {
            const input: InputChangeRole = {
                token: "token-mock",
                userId: "101",
                role: USER_ROLES.ADMIN
            }

            await userBusiness.changeRole(input)
            
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Apenas admins podem alterar a autorização de usuários.")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o usuário não for encontrado", async () => {
        expect.assertions(2)
        try {
            const input: InputChangeRole = {
                token: "token-astrodev",
                userId: "teste",
                role: USER_ROLES.ADMIN
            }

            await userBusiness.changeRole(input)
            
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Usuário não encontrado.")
                expect(error.statusCode).toEqual(404)
            }
        }
    })
})