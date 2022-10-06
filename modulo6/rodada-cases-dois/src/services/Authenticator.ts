import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { USER_ROLES } from '../models/Users'

dotenv.config()

export interface TokenPayload {
    id: string,
    role: USER_ROLES
}

export class Authenticator {
    generateToken = (payload: TokenPayload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

    getTokenPayload = (token: string): TokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY
            )

            return payload as TokenPayload
        } catch (error) {
            return null
        }
    }
}