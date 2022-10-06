import { ProductBusiness } from "../../src/business/ProductBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { InputEditProduct } from "../../src/models/Products"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
describe("Testes da ProductBusiness", () => {
    const producBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )
    
    test("Produto editado com sucesso", async () => {
            const input: InputEditProduct = {
                token: "token-astrodev",
                id: "123",
                name: "Teste do teste"
            }

            const response = await producBusiness.editProduct(input)

            expect(response.message).toEqual("Produto editado com sucesso")
    })

    test("Deve retornar erro caso o usuário não for autencicado", async () => {
        expect.assertions(2)
        try {
            const input: InputEditProduct = {
                token: "token-astrode",
                id: "1234",
                name: "123teste"
            }

            await producBusiness.editProduct(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado.")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o usuário não for admin", async () => {
        expect.assertions(2)
        try {
            const input: InputEditProduct = {
                token: "token-astroteste",
                id: "1234",
                name: "123teste"
            }

            await producBusiness.editProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Apenas admins podem editar produtos")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso o name vier vazio", async () => {
        expect.assertions(2)
        try {
            const input: InputEditProduct = {
                token: "token-astrodev",
                id: "1234",
                name: ""
            }

            await producBusiness.editProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'name' não pode vir vazio e ter no minimo 3 caractere.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o name tiver menos que 3 caracteres", async () => {
        expect.assertions(2)
        try {
            const input: InputEditProduct = {
                token: "token-astrodev",
                id: "1234",
                name: "a"
            }

            await producBusiness.editProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'name' não pode vir vazio e ter no minimo 3 caractere.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o produto não for encontrado", async () => {
        expect.assertions(2)
        try {
            const input: InputEditProduct = {
                token: "token-astrodev",
                id: "12",
                name: "aaaa"
            }

            await producBusiness.editProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Produto não encontrado")
                expect(error.statusCode).toEqual(404)
            }
        }
    })

    test("Deve retornar erro caso o produto não for encontrado", async () => {
        expect.assertions(2)
        try {
            const input: InputEditProduct = {
                token: "token-astrodev",
                id: "12",
                name: "aaaa"
            }

            await producBusiness.editProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Produto não encontrado")
                expect(error.statusCode).toEqual(404)
            }
        }
    })
})