import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { inputCreateShow } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testes da Showbusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Show criado com sucesso", async () => {
        const input: inputCreateShow = {
            token: "token-astrodev",
            band: "Banda teste",
            startsAt: new Date("2022/12/30")
        }

        const response = await showBusiness.create(input)

        expect(response.message).toEqual("Show cadastrado com sucesso")
    })

    test("Deve retornar erro caso o usuário não for admin", async () => {
        expect.assertions(2)
        try {
            const input = {
                token: "token-mock",
                band: "Banda teste de erro",
                startsAt: new Date("2022/12/07")
            }

            await showBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Apenas usuários admins podem criar shows")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso não for mandado token", async () => {
        expect.assertions(2)
        try {
            const input: inputCreateShow = {
                token: "",
                band: "Banda teste de erro",
                startsAt: new Date("2022/12/31")
            }

            await showBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso a data for anterior ao inicio do festival", async () => {
        expect.assertions(2)
        try {
            const input: inputCreateShow = {
                token: "token-astrodev",
                band: "Banda teste de erro",
                startsAt: new Date("2022/12/04")
            }

            await showBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("A data não pode ser anterior ao inicio do festival")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    
    test("Deve retornar erro caso a data não estiver disponível", async () => {
        expect.assertions(2)
        try {
            const input: inputCreateShow = {
                token: "token-astrodev",
                band: "Banda teste de erro",
                startsAt: new Date("2022/12/07")
            } 

            await showBusiness.create(input)
            
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Data indisponivel")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})  