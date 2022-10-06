import express, { Request, Response } from "express"
import cors from "cors"
import { Products, products } from "./data"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
        console.log("Server running on port 3003")
})

//endpoint for api test
app.get("/test", (req: Request, res: Response) => {
        try {
                res.status(200).send("Api working!")
        } catch (error) {
                res.status(500).send({message: error.message})
        }
})

// endpoint that returns all products

app.get("/products", (req: Request, res: Response) => {
        try {
                res.status(200).send({message: "Produtos encontrados", produtos: products})
        } catch (error) {
                res.status(500).send({message: "Erro inesperado"})
        }
})

// endpoint to create product

app.post("/products", (req: Request, res: Response) => {
        try {
                const {name, price} = req.body

                const lastProduct : Products = products[products.length - 1]

                const idLastProduct : number = Number(lastProduct.id)

                const newProduct : Products = {
                        id: `${idLastProduct + 1}`,
                        name,
                        price
                } 

                products.push(newProduct)

                res.status(201).send({message: "Produto adicionado com sucesso!", produtos : products })
        } catch (error) {
                res.status(500).send({message: "Erro inesperado"})
        }
})

app.put("/products/:id", (req: Request, res: Response) => {
        try {
                const {id} = req.params

                const {price} = req.body

                const filterProduct = products.filter((product : Products) => {
                        return product.id === id
                })

                if(filterProduct === undefined) {
                        throw new Error("Produto não encontrato");   
                }
                if(price < 0) {
                        throw new Error("O 'price' deve ser maior que 0");
                        
                }

                const mapProduct = filterProduct.map((product : Products) => {
                        product.price = price
                        return product
                })

                res.status(201).send({message: "Preço alterado com sucesso", produto: mapProduct})
        } catch (error) {
                res.status(422).send({message: error.message})
        }
})

