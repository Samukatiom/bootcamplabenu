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
    test("Tags ecnontradas com sucesso", async () => {
        const respose = await producBusiness.getTags("token-astroteste")

        expect(respose.message).toEqual("Tags encontradas com sucesso")
        expect(respose.tags).toEqual([
            {
                "id": "101",
                "name": "balada"
              },
              {
                "id": "105",
                "name": "casual"
              },
              {
                "id": "107",
                "name": "colorido"
              },
              {
                "id": "103",
                "name": "delicado"
              },
              {
                "id": "108",
                "name": "estampas"
              }
        ])
    })

    test("Deve retornar erro caso o usário não estiver autenticado", async () => {
        expect.assertions(2)
        try {
            await producBusiness.getTags("token-astroteste1234")
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Não autenticado")
                expect(error.statusCode).toEqual(401)
            }
        }
    })
})