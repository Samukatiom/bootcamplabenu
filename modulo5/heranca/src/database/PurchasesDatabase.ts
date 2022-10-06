import { Purchase } from "../models/Purchase";
import { BaseDatabase } from "./BaseDatabase";

export class PurchasesDatabase extends BaseDatabase {
    
    public static TABLE_USERS = "Labe_Users"
    public static TABLE_PRODUCTS = "Labe_Products"
    public static TABLE_PURCHASES = "Labe_Purchases"

    public async createPurchase( purchase: Purchase) {
        await BaseDatabase
        .connection(PurchasesDatabase.TABLE_PURCHASES)
        .insert({
            id: purchase.getId(),
            user_id: purchase.getUserId(),
            product_id: purchase.getProductId(),
            quantity: purchase.getQuantity(),
            total_price: purchase.getTotalPrice()
        })
    }

    public async getPurchasesById( id: string ) {
        const result = await BaseDatabase
        .connection(PurchasesDatabase.TABLE_PURCHASES)
        .select('email', 'name', 'quantity', 'total_price')
        .innerJoin(PurchasesDatabase.TABLE_USERS, `${PurchasesDatabase.TABLE_USERS}.id`, `${PurchasesDatabase.TABLE_PURCHASES}.user_id`)
        .innerJoin(PurchasesDatabase.TABLE_PRODUCTS, `${PurchasesDatabase.TABLE_PRODUCTS}.id`, `${PurchasesDatabase.TABLE_PURCHASES}.product_id`)
        .where(`${PurchasesDatabase.TABLE_USERS}.id`, "=", `${id}`)

        return result
    } 
}