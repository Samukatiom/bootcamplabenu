// type para tipar no typescript com camelCase
// export type Purchase = {
//     id: string,
//     userId: string,
//     productId: string,
//     quantity: number,
//     totalPrice: number
// }

export class Purchase {
    constructor(
        private id: string,
        private userId: string,
        private productId: string,
        private quantity: number,
        private totalPrice: number
    ) {
        this.id
        this.userId
        this.productId
        this.quantity
        this.totalPrice
    }
    public getId() { return this.id }
    public getUserId() { return this.userId }
    public getProductId() { return this.productId }
    public getQuantity() { return this.quantity }
    public getTotalPrice() { return this.totalPrice }
}
// type para tipar no banco de dados com snake_case
export type PurchaseDB = {
    id: string,
    user_id: string,
    product_id: string,
    quantity: number,
    total_price: number
}