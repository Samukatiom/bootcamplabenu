export interface ProductsDB {
    id: string,
    name: string
}
export interface ProductsTagsDB {
    id: string,
    product_id:
    string,
    tag_id: string
}
export interface TagsDB {
    id: string,
    name: string
}
export interface outputTags { tags: string }
export interface outputProducts {
    id: string,
    name: string,
    tags: string[]
}
export interface outputGetAll {
    message: string,
    products: Product[]
}
export interface GetProducts {
    token: string
    query?: string,
    sort: string,
    order: string,
    limit: number,
    page: number
}
export interface InputCreateProduct {
    token: string,
    name: string,
    tagsId?: string[]
}

export interface GetProductsInputDB {
    sort: string,
    order: string,
    limit: number,
    offset: number
}
export interface GetProductInputDB {
    sort: string,
    query: string
    order: string,
    limit: number,
    offset: number
}

export interface OutputProductByTag {
    id: string,
    product_id: string,
    tag_id: string,
    name: string
}

export interface InputCreateRelations {
    id: string,
    product_id: string,
    tag_id: string
}

export interface OutputTagsDB {
    id: string,
    name: string
}

export interface InputCreateTags {
    token: string,
    tags: string[]
}

export interface InputEditProduct {
    token: string,
    id: string,
    name: string
}

export interface InputDelete {
    token: string,
    id: string
}
export class Product {
    constructor(
        private id: string,
        private name: string,
        private tags: string[] = []
    ) { }

    public getId = () => {
        return this.id
    }
    public getName = () => {
        return this.name
    }
    public getTags = () => {
        return this.tags
    }

    public setName = (name: string) => {
        this.name = name
    }
    public setTags = (tag: string[]) => {
        this.tags = tag
    }
}