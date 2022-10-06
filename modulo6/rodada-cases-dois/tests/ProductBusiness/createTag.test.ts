import { ProductBusiness } from "../../src/business/ProductBusiness"
import { BaseError } from "../../src/errors/BaseError"
import {  InputCreateTags } from "../../src/models/Products"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
describe("Testes da ProductBusiness", () => {
    const producBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )
    
    test("Tags criadas com sucesso", async () => {
        const input: InputCreateTags = {
            token: "token-astrodev",
            tags: ["teste01", "teste02"]
        }

        const response = await producBusiness.createTag(input)

        expect(response.message).toEqual("Tags criadas com sucesso")
    })

    test("Deve retornar erro caso o usuário não for autencicado", async () => {
        expect.assertions(2)
        try {
            const input: InputCreateTags = {
                token: "token-astrode",
                tags: ["teste11", "teste22"]
            }

            await producBusiness.createTag(input)
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
            const input: InputCreateTags = {
                token: "token-astroteste",
                tags: ["teste31", "teste32"]
            }

            await producBusiness.createTag(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Apenas admins podem criar tags")
                expect(error.statusCode).toEqual(401)
            }
        }
    })

    test("Deve retornar erro caso a array de tags vier vazio", async () => {
        expect.assertions(2)
        try {
            const input: InputCreateTags = {
                token: "token-astrodev",
                tags: []
            }

            await producBusiness.createTag(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("A array de tags veio vazia.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("Deve retornar erro caso o nome da tag já estiver cadastrada", async () => {
        expect.assertions(2)
        try {
            const input: InputCreateTags = {
                token: "token-astrodev",
                tags: ["delicado"]
            }

            await producBusiness.createTag(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("A tag 'delicado' já está cadastrada no banco de dados cadastrada.")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Deve retornar erro caso o nome da tag for diferete de string", async () => {
        expect.assertions(2)
        try {
            const input = {
                token: "token-astrodev",
                tags: [103]
            } as unknown as InputCreateTags

            await producBusiness.createTag(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("tag deve ser uma string.")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})