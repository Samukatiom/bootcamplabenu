import { currentYear } from "../data"

export const ageReturn = (data: string) => {
    const yearOfBirth = Number(data.substring(6, 10))

    return currentYear - yearOfBirth
}
