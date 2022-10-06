import { pathToFileURL } from "url";
import { ProductDatabase } from "../database/ProductDatabase";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { RequestError } from "../errors/RequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { InputCreateProduct, GetProductInputDB, GetProducts, GetProductsInputDB, InputCreateRelations, outputGetAll, OutputProductByTag, outputTags, Product, ProductsDB, InputCreateTags, InputEditProduct, InputDelete } from "../models/Products";
import { USER_ROLES } from "../models/Users";
import { Authenticator, TokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ProductBusiness {
    constructor(
        private productDatabase: ProductDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public getAll = async (input: GetProducts) => {
        const { token, sort, order, limit, page } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado")
        }
        if (sort !== "name" && sort !== "id") {
            throw new RequestError("sort pode receber dois valores: 'name' e 'id'")
        }

        if (order !== "asc" && order !== "desc") {
            throw new RequestError("order pode receber dois valores: 'asc' e 'desc'")
        }

        const offset: number = limit * (page - 1)

        const inputDB: GetProductsInputDB = {
            sort,
            order,
            limit,
            offset
        }

        const outputProducts: ProductsDB[] = await this.productDatabase.getAll(inputDB)

        const products = outputProducts.map((product: ProductsDB) => {

            return new Product(product.id, product.name)
        })

        for (let product of products) {
            const tagsDB: outputTags[] = await this.productDatabase.getTagsByProductId(product.getId())

            const tags = tagsDB?.map((tag: outputTags) => tag.tags)

            product.setTags(tags)
        }
        const output: outputGetAll = {
            message: "Produtos encontrados com sucesso!",
            products
        }

        return output
    }

    public getByNameOrId = async (input: GetProducts) => {

        const { token, query, sort, order, limit, page } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado")
        }

        if (sort !== "name" && sort !== "id") {
            throw new RequestError("sort pode receber dois valores: 'name' e 'id'")
        }

        if (order !== "asc" && order !== "desc") {
            throw new RequestError("order pode receber dois valores: 'asc' e 'desc'")
        }

        const offset: number = limit * (page - 1)

        const inputDB: GetProductInputDB = {
            query: query.toUpperCase(),
            sort,
            order,
            limit,
            offset
        }

        const outputProducts: ProductsDB[] = await this.productDatabase.getByNameOrId(inputDB)

        if (!outputProducts || outputProducts.length === 0) {
            throw new NotFoundError("Produdo(s) não encontrado(s).")
        }

        const products = outputProducts.map((product: ProductsDB) => {
            return new Product(product.id, product.name)
        })

        for (let product of products) {
            const tagsDB: outputTags[] = await this.productDatabase.getTagsByProductId(product.getId())

            const tags = tagsDB?.map((tag: outputTags) => tag.tags)

            product.setTags(tags)
        }
        const output: outputGetAll = {
            message: "Produto(s) encontrado(s) com sucesso!",
            products
        }

        return output
    }

    public getByTag = async (input: GetProducts) => {
        const { token, query, sort, order, limit, page } = input

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado")
        }

        if (sort !== "name" && sort !== "id") {
            throw new RequestError("sort pode receber dois valores: 'name' e 'id'")
        }

        if (order !== "asc" && order !== "desc") {
            throw new RequestError("order pode receber dois valores: 'asc' e 'desc'")
        }

        const offset: number = limit * (page - 1)

        const inputDB: GetProductInputDB = {
            query: query.toLowerCase(),
            sort,
            order,
            limit,
            offset
        }

        const outputProducts = await this.productDatabase.getByTag(inputDB)

        if (!outputProducts || outputProducts.length === 0) {
            throw new NotFoundError("Produdo(s) não encontrado(s).")
        }

        const products = outputProducts.map((outputProduct: OutputProductByTag) => {

            return new Product(outputProduct.product_id, outputProduct.name)

        })
        for (let product of products) {
            const tagsDB: outputTags[] = await this.productDatabase.getTagsByProductId(product.getId())

            const tag = tagsDB?.map((tag: outputTags) => tag.tags)

            product.setTags(tag)
        }
        const output: outputGetAll = {
            message: "Produto(s) encontrado(s) com sucesso!",
            products
        }

        return output
    }

    public getTags = async (token: string) => {

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado")
        }

        const response = await this.productDatabase.getTags()

        return {
            message: "Tags encontradas com sucesso",
            tags: response
        }
    }

    public create = async (input: InputCreateProduct) => {
        const { token, name, tagsId } = input

        const payload: TokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado.")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new UnauthorizedError("Apenas admins podem criar produtos")
        }

        if (!name || name.length < 3) {
            throw new RequestError("Parâmetro 'name' não pode vir vazio e ter no minimo 3 caractere.")
        }

        const product = new Product(
            this.idGenerator.generate(),
            name.toUpperCase()
        )

        await this.productDatabase.createProduct(product)
        if (tagsId.length !== 0) {
            for (let tagId of tagsId) {
                if (typeof tagId !== "string") {
                    throw new RequestError("TagId deve ser uma string.")
                }

                const tags = await this.productDatabase.searchTags("id", tagId)

                if (!tags) {
                    throw new NotFoundError(`O produto não será vinculado com a tag, cujo o id é ${tagId}, pois está não foi encontrada`)
                }
            }

            for (let tagId of tagsId) {
                const inputCreateRelationsTags: InputCreateRelations = {
                    id: this.idGenerator.generate(),
                    product_id: product.getId(),
                    tag_id: tagId
                }
                await this.productDatabase.createRelations(inputCreateRelationsTags)
            }
        }


        const output = {
            message: "Produto criado com sucesso"
        }

        return output
    }

    public createTag = async (input: InputCreateTags) => {
        const { token, tags } = input

        const payload: TokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado.")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new UnauthorizedError("Apenas admins podem criar tags")
        }

        if(tags.length === 0) {
            throw new RequestError("A array de tags veio vazia.")
        }

        for(let tag of tags) {
            const isNameExist = await this.productDatabase.searchTags("name", tag)

            if(isNameExist) {
                throw new ConflictError(`A tag '${tag}' já está cadastrada no banco de dados cadastrada.`)
            }
        }

        for (let tag of tags) {
            if (typeof tag !== "string") {
                throw new RequestError("tag deve ser uma string.")
            }
            const inputDB = {
                id: this.idGenerator.generate(),
                name: tag.toLowerCase()
            }

            await this.productDatabase.createTag(inputDB)
        }

        return {
            message: "Tags criadas com sucesso"
        }

    }

    public editProduct = async (input: InputEditProduct) => {
        const { token, id, name } = input

        const payload: TokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new UnauthorizedError("Não autenticado.")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new UnauthorizedError("Apenas admins podem editar produtos")
        }

        if (!name || name.length < 3) {
            throw new RequestError("Parâmetro 'name' não pode vir vazio e ter no minimo 3 caractere.")
        }

        const inputDBMock: GetProductInputDB = {
            query: id,
            sort: "name",
            order: "asc",
            limit: 10,
            offset: 0
        }
        const productDB = await this.productDatabase.getByNameOrId(inputDBMock)

        if(!productDB || productDB.length === 0) {
            throw new NotFoundError("Produto não encontrado")
        }

        const product = new Product(
            productDB[0].id,
            productDB[0].name
        )
        product.setName(name.toUpperCase())

        await this.productDatabase.editProduct(product)

        return {
            message: "Produto editado com sucesso"
        }
    }

    public delete = async (input: InputDelete) => {
        const { token, id } = input

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload) {
            throw new UnauthorizedError("Não autenticado")
        }

        const inputDBMock: GetProductInputDB = {
            query: id,
            sort: "name",
            order: "asc",
            limit: 10,
            offset: 0
        }

        const productDB = await this.productDatabase.getByNameOrId(inputDBMock)

        if(!productDB || productDB.length === 0) {
            throw new NotFoundError("Produto não encontrado.")
        }

        await this.productDatabase.deleteAllRelations(id)

        await this.productDatabase.deleteProduct(id)

        return {
            message: "Produto excluido com sucesso"
        }
    }

    public deleteRelation = async (input: any) => {
        const { token, tagId, productId } = input

        await this.productDatabase.deleteRelation(tagId, productId)

        return {
            message: "Relação tag|product excluida com sucesso"
        }
    }

    public deleteTag = async (input: any) => {
        const { token, id } = input

        await this.productDatabase.deleteTag(id)

        return {
            message: "Relação tag|product excluida com sucesso"
        }
    }
}