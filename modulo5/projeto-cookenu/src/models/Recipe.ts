export interface IRecipeDB {
    id: string,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date,
    creator_id: string
}

export class Recipe {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private createdAt: Date,
        private updatedAt: Date,
        private creatorId: string
    ) {}

    public getId = () => {
        return this.id
    }
    public getTitle = () => {
        return this.title
    }
    public getDescription = () => {
        return this.description
    }
    public getCreatedAt = () => {
        return this.createdAt
    }
    public getUpdatedAt = () => {
        return this.updatedAt
    }
    public getCreatorId = () => {
        return this.creatorId
    }

    public setTitle = (title: string) => {
        this.title = title
    }
    public setDescription = (description: string) => {
        this.description = description
    }
    public setUpdatedAt = (updatedAt: Date) => {
        this.updatedAt = new Date(updatedAt)
    }

}