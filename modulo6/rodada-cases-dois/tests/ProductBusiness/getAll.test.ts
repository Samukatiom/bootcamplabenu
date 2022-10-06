import { ProductBusiness } from "../../src/business/ProductBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { GetProducts } from "../../src/models/Products"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
describe("Testes da ProductBusiness", () => {
    const producBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Produtos encontrados com sucesso", async () => {
        const input: GetProducts = {
            token: "token-astrodev",
            sort: "name",
            order: "asc",
            page: 1,
            limit: 10
        }


        const response = await producBusiness.getAll(input)

        expect(response.message).toEqual("Produtos encontrados com sucesso!")
    })

    test("Deve retornar erro caso o usário não estiver autenticado", async () => {
        expect.assertions(2)
        try {
            const input: GetProducts = {
                token: "token-astrodev123",
                sort: "name",
                order: "asc",
                page: 1,
                limit: 10
            }

            await producBusiness.getAll(input)
            
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso sort seja diferente de 'name' ou 'id'", async () => {
        expect.assertions(2)
        try {
            const input: GetProducts = {
                token: "token-astrodev",
                sort: "tag",
                order: "asc",
                page: 1,
                limit: 10
            }

            await producBusiness.getAll(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("sort pode receber dois valores: 'name' e 'id'")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso order seja diferente de 'asc' ou 'desc'", async () => {
        expect.assertions(2)
        try {
            const input: GetProducts = {
                token: "token-astrodev",
                sort: "name",
                order: "",
                limit: 10,
                page: 1
            }

            await producBusiness.getAll(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("order pode receber dois valores: 'asc' e 'desc'")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})