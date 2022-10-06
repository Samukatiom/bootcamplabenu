import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { inputLogin } from "../../src/models/User"
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

    test("Login realizado com sucesso", async () => {
        const input: inputLogin = {
            email: "astrodev@gmail.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)

        expect(response.message).toEqual("Login realizado com sucesso")
        expect(response.token).toEqual("token-astrodev")
    })

    test("Deve retornar erro caso a senha estiver incorreta", async () => {
        expect.assertions(2)
        try {
            const input: inputLogin = {
                email: "astrodev@gmail.com",
                password: "bananina"
            }

            await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Email ou senha inválidos")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o password tiver menos de 6 caracteres", async () => {
        expect.assertions(2)
        try {
            const input: inputLogin = {
                email: "astro@gmail.com",
                password: "12"
            }

            await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'password' inválido: deve ter ao menos 6 caracteres")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o email não estiver cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: inputLogin = {
                email: "teste@gmail.com",
                password: "teste123"
            }

            await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Email inválido")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Deve retornar erro caso o email não cumpra os requisitos de email", async () => {
        expect.assertions(2)
        try {
            const input: inputLogin = {
                email: "astrogmail.com",
                password: "123123"
            }

            await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'email' inválido: deve ter as característica de email")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})