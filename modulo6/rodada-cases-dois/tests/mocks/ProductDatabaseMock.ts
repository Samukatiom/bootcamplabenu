import { GetProductInputDB, GetProducts, GetProductsInputDB, OutputProductByTag, OutputTagsDB, outputTags, Product, ProductsDB } from "../../src/models/Products";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export const productDB: ProductsDB[] = [
    {
        id: "123",
        name: "CAMISA SELEÇÃO 2022"
    },
    {
        id: "1234",
        name: "VESTIDO BRANCO COM DETALHES AMARELO"
    },
    {
        id: "12345",
        name: "PIJAMA MONSTROS SA"
    },
    {
        id: "123456",
        name: "VESTIDO DE PRAIA FLORIDO"
    }
]
export class ProductDatabaseMock extends BaseDatabase {
    public static TABLE_PRODUCTS = "Amaro_Products"
    public static TABLE_TAGS = "Amaro_Tags"
    public static TABLE_PRODUCTS_TAGS = "Amaro_Products_Tags"

    public toProductDBModel = (product: Product): ProductsDB => {
        const productDB: ProductsDB = {
            id: product.getId(),
            name: product.getName()
        }

        return productDB
    }

    public getAll = async (inputDB: GetProductsInputDB): Promise<ProductsDB[]> => {
        const product: ProductsDB[] = productDB
        return product
    }

    public getByNameOrId = async (inputDB: GetProductInputDB): Promise<ProductsDB[] | undefined> => {
        switch (inputDB.query) {
            case "123":
                return [
                    {
                        id: "123",
                        name: "CAMISA SELEÇÃO 2022"
                    }
                ]
            case "1234":
                return [
                    {
                        id: "12345",
                        name: "SAIA ROSA CLARINHO COM LATEJOLAS"
                    }
                ]
            case "VESTIDO":
                return [
                    {
                        id: "1234",
                        name: "VESTIDO BRANCO COM DETALHES AMARELO"
                    },
                    {
                        id: "1234567",
                        name: "VESTIDO DE PRAIA FLORIDO"
                    }
                ]
            default:
                return undefined
        }
    }

    public getByTag = async (input: GetProductInputDB): Promise<OutputProductByTag[] | undefined> => {
        switch (input.query) {
            case "103":
                return [
                    {
                        id: "8371",
                        product_id: "123",
                        tag_id: "103",
                        name: "CAMISA SELEÇÃO 2022"
                    },
                    {
                        id: "8363",
                        product_id: "1234",
                        tag_id: "103",
                        name: "VESTIDO BRANCO COM DETALHES AMARELO"
                    },
                    {
                        id: "509caedb-c556-4584-a84d-02ef8fe42674",
                        product_id: "12345",
                        tag_id: "103",
                        name: "PIJAMA MONSTROS SA"
                    }
                ]
            default:
                return undefined
        }
    }

    public getTagsByProductId = async (id: string): Promise<outputTags[] | undefined> => {
        switch (id) {
            case "123":
                return [
                    { tags: "colorido" },
                    { tags: "metal" },
                    { tags: "delicado" },
                    { tags: "estampas" },
                    { tags: "passeio" }
                ]
            default:
                return undefined
        }
    }

    public searchTags = async (property: string, value: string): Promise<OutputTagsDB | undefined> => {
        if (property === "id") {
            switch (value) {
                case "103":
                    return {
                        id: "103",
                        name: "delicado"
                    }
                default:
                    return undefined
            }
        } else if(property === "name") {
            switch(value) {
                case "delicado":
                    return {
                        id: "103",
                        name: "delicado"
                    }
            }
        }
        else return undefined
    }

    public getTags = async (): Promise<OutputTagsDB[] | undefined> => {
        const tags = [
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
        ]

        return tags
    }

    public createProduct = async (product: Product) => {

    }

    public createRelations = async (input: any) => {

    }

    public createTag = async (input: any) => {

    }

    public editProduct = async (product: Product) => {

    }

    public deleteAllRelations = async (productId: string) => {

    }

    public deleteProduct = async (id: string) => {

    }

    public deleteRelation = async (tagId: string, productId: string) => {

    }

    public deleteTag = async (id: string) => {

    }

}