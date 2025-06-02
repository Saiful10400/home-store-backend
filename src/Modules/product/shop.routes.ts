import { Router } from "express";
import shopController from "./shop.controller";

const router=Router()

// create a product.
router.post("/create-product",shopController.createProduct)

// update a product.
router.put("/update-product/:id",shopController.updateProduct)

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

// get  all sells.
router.get("/sell",shopController.getAllSells)

// get  a particular day sells.
router.get("/sell/:id",shopController.getASpecificDateSells)


// get a due user all sells.
router.get("/sell/due-user/:id",shopController.aDueUserAllSells)  


/// due user due payment.
router.put("/due-payment/:id",shopController.duePay)

/// get a  user due payment.
router.get("/due-payment/:id",shopController.getADueUserPayment)


/// due payment 2.
router.post("/due-payment2/create",shopController.createDuepayment2)

//update.
router.put("/due-payment2/update/:id",shopController.updateDuePayment2)

// get all due payment.
router.get("/due-payment2/get",shopController.getDuePayment2)

 
export const productRouter=router