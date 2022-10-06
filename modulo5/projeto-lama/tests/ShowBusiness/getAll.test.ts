import { ShowBusiness } from "../../src/business/ShowBusiness"
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

    test("Shows encontrados com sucesso", async () => {

        const response = await showBusiness.getAll()

        expect(response.message).toEqual("Shows encontrados com sucesso")
        expect(response.shows).toBeDefined()
    })
})