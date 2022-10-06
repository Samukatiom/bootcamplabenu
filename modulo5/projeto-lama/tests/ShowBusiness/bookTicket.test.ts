import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { inputBookOrDeleteTicket, ITicketDB } from "../../src/models/Show"
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

    test("Ingresso reservado com sucesso", async () => {

        const input: inputBookOrDeleteTicket = {
            showId: "201",
            token: "token-mock"
        }

        const response = await showBusiness.bookTicket(input)

        expect(response.message).toEqual("Ingresso reservado")
    })

    test("Deve retornar erro caso o token seja invalido", async () => {
        expect.assertions(2)
        try {
            const input: inputBookOrDeleteTicket = {
                showId: "201",
                token: "token-teste-erro"
            }

            await showBusiness.bookTicket(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o show não esteja cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: inputBookOrDeleteTicket = {
                showId: "12345",
                token: "token-mock"
            }

            await showBusiness.bookTicket(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Show inexistente")
                expect(error.statusCode).toEqual(404)
            }
        }
    })

    test("Deve retornar erro caso o usuario já tenha reservado um ingresso no show desejado", async () => {
        expect.assertions(2)
        try {
            const input: inputBookOrDeleteTicket = {
                showId: "201",
                token: "token-astrodev"
            }

            await showBusiness.bookTicket(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("O usuário pode reservar apenas um ingresso por show")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Deve retornar erro caso os ingressos estejam esgotados", async () => {
        expect.assertions(2)
        try {
            const input: inputBookOrDeleteTicket = {
                showId: "201",
                token: "token-astrodev"
            }

            await showBusiness.bookTicket(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("O usuário pode reservar apenas um ingresso por show")
                expect(error.statusCode).toEqual(409)
            }
        }
    })
})