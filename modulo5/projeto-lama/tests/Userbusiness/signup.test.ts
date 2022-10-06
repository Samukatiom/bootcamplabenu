import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { inputSignup } from "../../src/models/User"
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

    test("Signup realizado com sucesso", async () => {
        const input: inputSignup = {
            name: "Samuel Araujo",
            email: "sam@gmail.com",
            password: "123sam"
        }

        const response = await userBusiness.signup(input)

        expect(response.message).toEqual("Cadastro realizado com sucesso")
        expect(response.token).toEqual("token-mock")
    })

    test("Deve retornar erro caso o email já estiver cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: inputSignup = {
                name: "teste",
                email: "astrodev@gmail.com",
                password: "teste"
            }

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Email já cadastro")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Deve retornar erro caso o password tiver menos de 6 caracteres", async () => {
        expect.assertions(2)
        try {
            const input: inputSignup = {
                name: "teste",
                email: "astro@gmail.com",
                password: "12"
            }

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'password' inválido: deve ter ao menos 6 caracteres")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o email não cumpra os requisitos de email", async () => {
        expect.assertions(2)
        try {
            const input: inputSignup = {
                name: "teste",
                email: "astrogmail.com",
                password: "123123"
            }

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'email' inválido: deve ter as característica de email")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})