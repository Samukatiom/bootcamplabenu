import { ProductBusiness } from "../../src/business/ProductBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { InputCreateTags, InputDelete } from "../../src/models/Products"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"

describe("Testes da ProductBusiness", () => {
    const producBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Produto deletado com sucesso", async () => {
        const input: InputDelete = {
            token: "token-astrodev",
            id: "123"
        }
        const response = await producBusiness.delete(input)

        expect(response.message).toEqual("Produto excluido com sucesso")
    })

    test("Deve retornar erro caso o usuário não estiver autenticado", async () => {
        expect.assertions(2)
        try {
            const input: InputDelete = {
                token: "token-astrdev",
                id: "123"
            }

            await producBusiness.delete(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado.")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o produto não for encontrado", async () => {
        expect.assertions(2)
        try {
            const input: InputDelete = {
                token: "token-astrodev",
                id: ""
            }

            await producBusiness.delete(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado.")
                expect(error.statusCode).toEqual(401)
            }
        }
    })
})