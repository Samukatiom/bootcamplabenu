import { Router } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductController } from "../controller/ProductController";
import { ProductDatabase } from "../database/ProductDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const productRouter = Router()

const productController = new ProductController(
        new ProductBusiness(
        new ProductDatabase(),
        new IdGenerator(),
        new Authenticator()
    )
)

productRouter.get("/", productController.getAll)
productRouter.get("/search", productController.getByNameOrId)
productRouter.get("/search/tag", productController.getByTag)
productRouter.get("/tags", productController.getTags)
productRouter.post("/", productController.create)
productRouter.post("/tags", productController.createTag)
productRouter.put("/:id", productController.editProduct)
productRouter.delete("/:id", productController.delete)
productRouter.delete("/relations/:tagId/:productId", productController.deleteRelation)
productRouter.delete("/tag/:id", productController.deleteRelation)



