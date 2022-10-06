// export type Product = {
//     id: string,
//     name: string,
//     price: number
// }

export class Product {
    constructor(
        private id: string,
        private name: string,
        private price: string
    ) {
        this.id = id
        this.name = name
        this.price = price
    }
    public getId() { return this.id }
    public getName() { return this.name }
    public getPrice() { return this.price }
}