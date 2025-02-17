// create product

import { Request, Response } from "express";

import httpStatus from "http-status";
import shopService from "./shop.service";
import sendResponse from "../../Utility/sendResponse";
import catchAsync from "../../Utility/catchAsync";

// create product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.createProduct(req.body);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Product created.",
  });
});

// deleteProduct
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.deleteProduct(req.params.id);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Product created.",
  });
});

// find product
const findProduct = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.getProduct(
    req.query?.id as string | undefined,
    req.query?.searchTerm as string | undefined
  );
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Product created.",
  });
});


// create due customer.
 
const createDueCustomer = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.createDueCustomer(req.body);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "new deu customer created.",
  });
});
 
const getdueCustomer = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.getDueCustomer();
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "all due customers.",
  });
});

// create a sell.
 
const createASell = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.createASell(req.body);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "A sell created.",
  });
});

const shopController = { createProduct, deleteProduct, findProduct,createDueCustomer,getdueCustomer,createASell };
export default shopController;
