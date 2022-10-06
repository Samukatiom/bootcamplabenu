import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { InputSignup } from "../../src/models/Users"
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
        const input: InputSignup = {
            name: "Samuel Araujo",
            email: "testesucesso@gmail.com",
            password: "teste123"
        }

        const response = await userBusiness.signup(input)

        expect(response.message).toEqual("Cadastro realizado com sucesso")
        expect(response.token).toEqual("token-mock")
    })

    test("Deve retornar erro caso o email já estiver cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: InputSignup = {
                name: "Teste para erro",
                email: "astrodev@gmail.com",
                password: "teste123"
            }

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Email já cadastrado.")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Deve retornar erro caso o parametro name não for uma string", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: undefined,
                email: "samuca@teste.com",
                password: "teste123"
            } as unknown as InputSignup

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'name' inválido.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    
    test("Deve retornar erro caso o parametro email não for uma string", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: "Teste",
                email: undefined,
                password: "teste123"
            } as unknown as InputSignup

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'email' inválido.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o parametro password não for uma string", async () => {
        expect.assertions(2)
        try {
            const input = {
                name: "Teste",
                email: "samuca@teste.com",
                password: 123456
            } as unknown as InputSignup

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'password' inválido.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o parametro name tiver menos que 3 caracteres", async () => {
        expect.assertions(2)
        try {
            const input: InputSignup = {
                name: "Te",
                email: "samuca@teste.com",
                password: "123456"
            }

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("O parâmentro 'name', deve ter ao mínimo 3 caracteres.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o parametro email não cumprir os requisitos de um email valido", async () => {
        expect.assertions(2)
        try {
            const input: InputSignup = {
                name: "Teste",
                email: "samuca@testecom",
                password: "123456"
            }

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'email' deve conter as características de email.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o parametro password tiver menos que 6 caracteres", async () => {
        expect.assertions(2)
        try {
            const input: InputSignup = {
                name: "Teste",
                email: "samuca@teste.com",
                password: "123"
            }

            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'password' deve ter ao menos 6 carecteres")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})