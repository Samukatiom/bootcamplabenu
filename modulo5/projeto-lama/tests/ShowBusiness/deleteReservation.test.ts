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
            token: "token-astrodev"
        }

        const response = await showBusiness.deleteReservation(input)

        expect(response.message).toEqual("Reserva de ingresso desfeita")
    })

    // test("Deve retornar erro caso o ingresso não estiver reservado", async () => {
    //     expect.assertions(2)
    //     try {
    //         const input: inputBookOrDeleteTicket = {
    //             showId: "id-erro",
    //             token: "token-erro"
    //         }
            
    //         await showBusiness.deleteReservation(input)

    //     } catch (error) {
    //         if (error instanceof BaseError) {
    //             expect(error.message).toEqual("Ingresso não reservado")
    //             expect(error.statusCode).toEqual(409)
    //         }
    //     }
    // })
})
