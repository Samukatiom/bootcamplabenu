export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}
export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
}
export interface ShowUser {
    id: string,
    name: string,
    email: string,
    role: USER_ROLES
}
export interface ProductUserDB {
    id: string,
    product_id: string,
    user_id: string
}
export interface OutputSignup {
    message: string,
    user: ShowUser,
    token: string
}
export interface InputSignup {
    name: string,
    email: string,
    password: string
}
export interface InputLogin {
    email: string,
    password: string
}
export interface InputChangeRole {
    token: string,
    userId: string,
    role: USER_ROLES
}
export interface OutputChangeRole {
    message: string,
    user: ShowUser
}

export interface InputDelete {
    token: string,
    userId: string
}



export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES = USER_ROLES.NORMAL
    ) {}

    public getId = () => {
        return this.id
    }

    public getName = () => {
        return this.name
    }

    public getEmail = () => {
        return this.email
    }

    public getPassword = () => {
        return this.password
    }

    public getRole = () => {
        return this.role
    }
    public setRole = (role: USER_ROLES) => {
        this.role = role
    }
}