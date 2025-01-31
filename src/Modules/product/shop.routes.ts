import { Router } from "express";
import shopController from "./shop.controller";

const router=Router()

// create a product.
router.post("/create-product",shopController.createProduct)

// delete product.
router.delete("/delete-product/:id",shopController.deleteProduct)

//find products
router.get("/find-product",shopController.findProduct)






export const productRouter=router