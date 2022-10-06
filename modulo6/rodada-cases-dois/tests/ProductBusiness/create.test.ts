import { ProductBusiness } from "../../src/business/ProductBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { InputCreateProduct } from "../../src/models/Products"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
describe("Testes da ProductBusiness", () => {
    const producBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )
    test("Produto criado com sucesso.", async () => {
        const input: InputCreateProduct = {
            token: "token-astrodev",
            name: "Teste do teste",
            tagsId: ["103"]
        }
        const response = await producBusiness.create(input)

        expect(response.message).toEqual("Produto criado com sucesso")
    })

    test("Produto criado com sucesso | Sem tags.", async () => {
        const input: InputCreateProduct = {
            token: "token-astrodev",
            name: "Teste do teste",
            tagsId: []
        }
        const response = await producBusiness.create(input)

        expect(response.message).toEqual("Produto criado com sucesso")
    })

    test("Deve retornar erro caso o usuário não for autencicado", async () => {
        expect.assertions(2)
        try {
            const input: InputCreateProduct = {
                token: "token-astrodev12",
                name: "Teste do teste",
                tagsId: ["103"]
            }

            await producBusiness.create(input)
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
            const input: InputCreateProduct = {
                token: "token-astroteste",
                name: "Teste do teste",
                tagsId: ["103"]
            }

            await producBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Apenas admins podem criar produtos")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso name vier vazio", async () => {
        expect.assertions(2)
        try {
            const input = {
                token: "token-astrodev",
                name: undefined,
                tagsId: ["103"]
            } as unknown as InputCreateProduct

            await producBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'name' não pode vir vazio e ter no minimo 3 caractere.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso name tiver menos que 3 caracteres", async () => {
        expect.assertions(2)
        try {
            const input = {
                token: "token-astrodev",
                name: "a",
                tagsId: ["103"]
            } as unknown as InputCreateProduct

            await producBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'name' não pode vir vazio e ter no minimo 3 caractere.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso a tagId não for uma string", async () => {
        expect.assertions(2)
        try {
            const input = {
                token: "token-astrodev",
                name: "Teste do teste",
                tagsId: [1003]
            } as unknown as InputCreateProduct

            await producBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("TagId deve ser uma string.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso a tag não for encontrada", async () => {
        expect.assertions(2)
        try {
            const input: InputCreateProduct = {
                token: "token-astrodev",
                name: "Teste do teste",
                tagsId: ["1003"]
            }

            await producBusiness.create(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual(`O produto não será vinculado com a tag, cujo o id é 1003, pois está não foi encontrada`)
                expect(error.statusCode).toEqual(404)
            }
        }
    })
})