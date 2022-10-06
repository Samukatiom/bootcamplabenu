import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { ping } from "./endpoints/ping"
import { userRegistration } from "./endpoints/userRegistration"
import { getUsers } from "./endpoints/getUsers"
import { registerProduct } from "./endpoints/registerProduct"
import { getProducts } from "./endpoints/getProducts"
import { registerPurchases } from "./endpoints/registerPurchases"
import { getPurchasesByUsers } from "./endpoints/getPurchasesByUsers"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server running on port ${process.env.PORT || 3003}`)
})
// Endpoint for test
app.get('/ping', ping)

// Endpoint for user registration
app.post('/users', userRegistration)

// Endpoint to get all users --- por segurança este endpoint irá retornar o id e o email do usuário
app.get('/users', getUsers)

// Endpoint for product registration
app.post('/products', registerProduct)

// Endpoint to get all products 
app.get('/products', getProducts)

// Endpoint for purchases 
app.post('/purchases', registerPurchases)

// Endpoint to get all products 
app.get('/users/:user_id/purchase', getPurchasesByUsers)