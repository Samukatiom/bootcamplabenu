import { USER_ROLES } from "../../../src/models/Users"
import { TokenPayload } from "../../../src/services/Authenticator"

export class AuthenticatorMock {
    generateToken = (payload: TokenPayload): string => {
        switch (payload.id) {
            case "101":
                return "token-astrodev"
            case "102":
                return "token-astroteste"
            default:
                return "token-mock"
        }
    }

    getTokenPayload = (token: string): TokenPayload | null => {
        switch (token) {
            case "token-mock":
                return {
                    id: "id-mock",
                    role: USER_ROLES.NORMAL
                }
            case "token-astroteste":
                return {
                    id: "102",
                    role: USER_ROLES.NORMAL
                }
            case "token-astrodev":
                return {
                    id: "101",
                    role: USER_ROLES.ADMIN
                }
            default:
                return null
        }
    }
}