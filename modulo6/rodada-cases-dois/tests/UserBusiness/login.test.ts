import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { InputLogin } from "../../src/models/Users"
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
        const input: InputLogin = {
            email: "astrodev@gmail.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)

        expect(response.message).toEqual("Login realizado com sucesso")
        expect(response.token).toEqual("token-astrodev")
    })

    test("Deve retornar erro casos a senha estiver incorreta", async () => {
        expect.assertions(2)
        try {
            const input: InputLogin = {
                email: "astrodev@gmail.com",
                password: "bananinhha"
            }

            await userBusiness.login(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Email ou senha inválida.")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o email não estiver cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: InputLogin = {
                email: "astrodv@gmail.com",
                password: "bananinha"
            }

            await userBusiness.login(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Email ou senha inválida.")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Deve retornar erro caso o parametro email não for do tipo string", async () => {
        expect.assertions(2)
        try {
            const input = {
                email: undefined,
                password: "bananinha"
            } as unknown as InputLogin

            await userBusiness.login(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'email' inválido.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o parametro password não for do tipo string", async () => {
        expect.assertions(2)
        try {
            const input = {
                email: "astrodev@gmail.com",
                password: 123456
            } as unknown as InputLogin

            await userBusiness.login(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'password' inválido.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o parametro email não cumprir os requisitos de um email valido", async () => {
        expect.assertions(2)
        try {
            const input = {
                email: "astrodev@gmailcom",
                password: "bananinha"
            } as unknown as InputLogin

            await userBusiness.login(input)
        } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'email' deve conter as características de email.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})