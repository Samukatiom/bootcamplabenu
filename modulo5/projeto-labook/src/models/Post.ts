export interface IPostDB {
    id: string,
    content: string,
    user_id: string
}

export interface ILikeDB {
    id: string,
    post_id: string,
    user_id: string
}

export interface ICreatePostDTO { content: string, token: string }

export interface IGetPostsDTO {
    id: string,
    content: string,
    userId: string,
    likes: number,
    name: string
}

export interface IRetrurnPostsAdminDTO {
    userId: string,
    email: string,
    name: string,
    postId: string,
    content: string,
    likes: string
}
export interface IReturnPostsNormalDTO {
    userId: string,
    name: string,
    postId: string,
    content: string,
    likes: string
}

export interface IDeleteAndLikePostsDTO { id: string, token: string }

export class Post {
    constructor(
        private id: string,
        private content: string,
        private userId: string,
        private likes: number = 0
    ) {}

    public getId = () => {
        return this.id
    }

    public getContent = () => {
        return this.content
    }

    public getUserId = () => {
        return this.userId
    }

    public getLikes = () => {
        return this.likes
    }

    public setContent = (newContent: string) => {
        this.content = newContent
    }
    
    public setLikes = (newLikes: number) => {
        this.likes = newLikes
    }
}
