import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { InputDelete, User } from "../../src/models/Users"
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
    
    test("Usuário encontrado com sucesso", async () => {
        const input: InputDelete = {
            token: "token-astrodev",
            userId: "102"
        }

        const user = new User(
            input.userId,
            "AstroTeste",
            "astroteste@gmail.com",
            "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC"
        )

        const response = await userBusiness.delete(input)

        expect(response.message).toEqual(`Usuário ${user.getName()} excluído com sucesso.`)
    })

    test("Deve retornar erro caso o usuário não estiver autenticado", async () => {
        expect.assertions(2)
        try {
            const input: InputDelete = {
                token: "token-blabla",
                userId: "102"
            }

            await userBusiness.delete(input)
            
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retonar erro caso o usuário não for encontrado", async () => {
        expect.assertions(2)
        try {
            const input: InputDelete = {
                token: "token-astrodev",
                userId: "100"
            }

            await userBusiness.delete(input)
            
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Usuário não encontrado.")
                expect(error.statusCode).toEqual(404)
            }
        }
    })

    test("Deve retonar erro caso um usuário sem permissão de admin tente excluir outro usuários", async () => {
        expect.assertions(2)
        try {
            const input: InputDelete = {
                token: "token-mock",
                userId: "101"
            }

            await userBusiness.delete(input)
            
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Apenas admins podem excluir extras a do usuário.")
                expect(error.statusCode).toEqual(401)
            }
        }
    })
})