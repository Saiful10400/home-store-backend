import { Router } from "express";
import shopController from "./shop.controller";

const router=Router()

// create a product.
router.post("/create-product",shopController.createProduct)

// delete product.
router.delete("/delete-product/:id",shopController.deleteProduct)

//find products
router.get("/find-product",shopController.findProduct)


//create due customer
router.post("/due/create-customer",shopController.createDueCustomer)
// get due customer
router.get("/customer/due",shopController.getdueCustomer)

// create  a sell.
router.post("/sell/create",shopController.createASell)

 
export const productRouter=router