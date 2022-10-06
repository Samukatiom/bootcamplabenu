export type Client = {
    id: number // user account id
    name: string // username
    cpf: string // unique user document
    birthDate: string // user's date of birth
    balance: number // user balance
    extract: Bill[] // list of paid bills
}

export type Bill = {
    value: number // account payable amount
    description: string // account payable desciption
    payDay: string //bill payment date(always the current account registration date)
}