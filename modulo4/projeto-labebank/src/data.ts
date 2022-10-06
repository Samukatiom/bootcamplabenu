import { Client } from "./types";

export const custumers: Client[] = [
    {
        id: 1,
        name: "Samuel Araujo",
        birthDate: "03/02/1999",
        cpf: "111.063.269-03",
        balance: 2000,
        extract: [
            {
                value: 199,
                description: "Conta do cartão crédito paga",
                payDay: "08/07/2022"
            }
        ]
    }
]
const date: any = new Date()

export const currentYear: number = date.getFullYear()
