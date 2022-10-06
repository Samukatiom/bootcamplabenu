import { IGetPostsDTO, ILikeDB, IPostDB, IRetrurnPostsAdminDTO, Post } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"
import { UserDatabase } from "./UserDatabase"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "Labook_Posts"
    public static TABLE_LIKES = "Labook_Likes"

    public create = async (post: Post) => {
        const postDB: IPostDB = {
            content: post.getContent(),
            id: post.getId(),
            user_id: post.getUserId()
        }

        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    public getAllPosts = async () => {
        const result = await BaseDatabase.connection.raw(`
        SELECT
            ${UserDatabase.TABLE_USERS}.id AS userId,
            ${UserDatabase.TABLE_USERS}.email,
            ${UserDatabase.TABLE_USERS}.name,
            ${PostDatabase.TABLE_POSTS}.id AS postId,
            ${PostDatabase.TABLE_POSTS}.content,
            COUNT (${PostDatabase.TABLE_LIKES}.id) AS likes
            FROM ${PostDatabase.TABLE_POSTS}
            JOIN ${UserDatabase.TABLE_USERS}
            ON ${PostDatabase.TABLE_POSTS}.user_id = ${UserDatabase.TABLE_USERS}.id
            JOIN ${PostDatabase.TABLE_LIKES}
            ON ${PostDatabase.TABLE_LIKES}.post_id = ${PostDatabase.TABLE_POSTS}.id
            GROUP BY postId, userId;
        `)

        return result[0]
    }

    public delete = async (id: string) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    public like = async (like: ILikeDB) => {
        
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES)
            .insert({ id: like.id, user_id: like.user_id, post_id: like.post_id })
    }

    public removeLike = async (likeId: string) => {

        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES)
            .delete()
            .where({id: likeId})
    }

    public findById = async (likeId: string) => {

        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({id: likeId})

        return result[0]
    }

    public findLikeByUserId = async (userId: string) => {

        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES)
            .select()
            .where({user_id: userId})

        return result[0]
    }

    public findLikeById = async (id: string) => {

        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES)
            .where({ id })

        return result[0]
    }
}