import { GetProductInputDB, GetProducts, GetProductsInputDB, InputCreateRelations, OutputProductByTag, OutputTagsDB, outputTags, Product, ProductsDB } from "../models/Products";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class ProductDatabase extends BaseDatabase {
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
        const productDB = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .orderBy(`${inputDB.sort}`, `${inputDB.order}`)
            .limit(inputDB.limit)
            .offset(inputDB.offset)
        return productDB
    }

    public getByNameOrId = async (inputDB: GetProductInputDB): Promise<ProductsDB[] | undefined> => {
        const productDB = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .orderBy(`${inputDB.sort || "name"}`, `${inputDB.order || "asc"}`)
            .limit(inputDB.limit || 10)
            .where({ id: inputDB.query})
            .orWhereLike("name", `%${inputDB.query}%`)
            .offset(inputDB.offset || 0)
        return productDB
    }

    public getByTag = async (input: GetProductInputDB) => {
        const productDB = await BaseDatabase.connection.raw(`
            SELECT 
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.id,
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.product_id,
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.tag_id,
                ${ProductDatabase.TABLE_PRODUCTS}.name ,
                ${ProductDatabase.TABLE_TAGS}.name as "tags"
            FROM
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}
            JOIN
                ${ProductDatabase.TABLE_TAGS}
            ON
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.tag_id = ${ProductDatabase.TABLE_TAGS}.id
            JOIN 
                ${ProductDatabase.TABLE_PRODUCTS}
            ON 
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.product_id = ${ProductDatabase.TABLE_PRODUCTS}.id
            WHERE 
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.tag_id = "${input.query}"
            ORDER BY "${input.sort}" "${input.order}" 
            LIMIT
                ${input.limit}
            OFFSET
                ${input.offset};
        `)
        return productDB[0]
    }

    public getTagsByProductId = async (id: string): Promise<outputTags[] | undefined> => {
        const tagsDB = await BaseDatabase.connection.raw(`
            SELECT
                ${ProductDatabase.TABLE_TAGS}.name AS tags
            FROM
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}
            JOIN
                ${ProductDatabase.TABLE_TAGS}
            ON
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.tag_id = ${ProductDatabase.TABLE_TAGS}.id
            JOIN
                ${ProductDatabase.TABLE_PRODUCTS}
            ON
                ${ProductDatabase.TABLE_PRODUCTS_TAGS}.product_id = ${ProductDatabase.TABLE_PRODUCTS}.id
            WHERE
                product_id = "${id}"
        `)
        return tagsDB[0]
    }
    public getTags = async (): Promise<OutputTagsDB[] | undefined> => {
        const tags = await BaseDatabase.
            connection(ProductDatabase.TABLE_TAGS)
            .orderBy("name", "asc")
        return tags
    }
    public searchTags = async (property: string, value: string): Promise<OutputTagsDB | undefined> => {
        const tag = await BaseDatabase
            .connection(ProductDatabase.TABLE_TAGS)
            .where(`${property}`, "=", `${value}`)
        return tag[0]
    }
    public createProduct = async (product: Product) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .insert(this.toProductDBModel(product))
    }

    public createRelations = async (input: InputCreateRelations) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS_TAGS)
            .insert(input)
    }

    public createTag = async (input: any) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_TAGS)
            .insert(input)
    }

    public editProduct = async (product: Product) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .update({ name: this.toProductDBModel(product).name })
            .where({ id: this.toProductDBModel(product).id })
    }

    public deleteAllRelations = async (productId: string) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS_TAGS)
            .delete()
            .where({ product_id: productId })
    }

    public deleteProduct = async (id: string) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .delete()
            .where({ id })
    }

    public deleteRelation = async (tagId: string, productId: string) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS_TAGS)
            .delete()
            .where({ product_id: productId, tag_id: tagId })
    }

    public deleteTag = async (id: string) => {
        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS_TAGS)
            .delete()
            .where({ id })
    }

}