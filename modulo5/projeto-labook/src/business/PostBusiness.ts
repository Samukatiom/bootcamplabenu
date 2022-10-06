import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { ICreatePostDTO, IDeleteAndLikePostsDTO, ILikeDB, IRetrurnPostsAdminDTO, IReturnPostsNormalDTO, Post } from "../models/Post"
import { USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public create = async (input: ICreatePostDTO) => {
        const { content, token } = input

        if (!content) {
            throw new Error("O paramentro 'content' está faltando.");
        }

        if (!token) {
            throw new Error("Token faltando");
        }

        if (content.length < 1) {
            throw new Error("O parametro 'content' deve ter ao menos 1 caractere");
        }

        const id = this.idGenerator.generate()

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido");
        }

        const post = new Post(
            id,
            content,
            payload.id
        )

        await this.postDatabase.create(post)

        return { message: "Post criado com sucesso", post }
    }

    public getAllPosts = async (input: string) => {
        const token: string = input

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido");
        }

        const posts = await this.postDatabase.getAllPosts()

        if(payload.role !== USER_ROLES.ADMIN) {
            const postsForNormal = posts.map((post : IRetrurnPostsAdminDTO) => {
                const result : IReturnPostsNormalDTO = {
                    userId: post.userId,
                    name: post.name,
                    postId: post.postId,
                    content: post.content,
                    likes: post.likes
                }
                return result
            })
            return { postsForNormal }
        }
        return { posts }
    }

    public delete = async (input: IDeleteAndLikePostsDTO) => {
        const { id, token } = input

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido");
        }

        const findById = await this.postDatabase.findById(id)

        if(!findById) {
            throw new Error("Post não encontrado");
        }

        await this.postDatabase.delete(id)

        return { message: "Post deletado com sucesso!" }
    }

    public like = async (input: IDeleteAndLikePostsDTO) => {
        const { id, token } = input

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido");
        }

        const findById = await this.postDatabase.findById(id)

        console.log(findById)

        if(!findById) {
            throw new Error("Post não encontrado");
        }

        const findLikeByUserId = await this.postDatabase.findLikeByUserId(payload.id)

        console.log(findLikeByUserId)

        if(findLikeByUserId) {
            throw new Error("Post já curtido.");
        }

        const likeId = this.idGenerator.generate()

        const like: ILikeDB = {
            id: likeId,
            post_id: id,
            user_id: payload.id
        }

        await this.postDatabase.like(like)

        return { message: "Post curtido com sucesso." }
    }

    public removeLike = async (input: IDeleteAndLikePostsDTO) => {
        const { id, token } = input

        const payload: ITokenPayload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido");
        }

        const findLikeById = await this.postDatabase.findLikeById(id)

        console.log(findLikeById)

        if(!findLikeById) {
            throw new Error("Like não encontrado");
        }

        const findLikeByUserId = this.postDatabase.findLikeByUserId(payload.id)

        if(!findLikeByUserId) {
            throw new Error("O post ainda não foi curtido.");
        }

        await this.postDatabase.removeLike(id)

        return { message: "Post descurtido com sucesso" }
    }
}