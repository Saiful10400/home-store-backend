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
// update product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.updateProduct(
    req.params.id as string,
    req.body
  );
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully.",
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
    message: "A complete sell created.",
  });
});

// get all sell.

const getAllSells = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.getAllSells();
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "All sells retrieved",
  });
});
// get all sell.

const getASpecificDateSells = catchAsync(
  async (req: Request, res: Response) => {
    const data = await shopService.getAParticularDaySells(req.params.id);
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "a day's all sells retrieved",
    });
  }
);

// get due user sells..

const aDueUserAllSells = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.ADueUserAllSElls(req.params.id);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "a due user all sells retrieved",
  });
});

/// update due payment.

const duePay = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.duePay(
    req.params.id,
    req.query.amount as string
  );
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "due user price updated.",
  });
});

/// get a  due user payment.

const getADueUserPayment = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.getADueUserPayment(req.params.id);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "get a due user payment.",
  });
});

// due payment2.

const createDuepayment2 = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.createDuePayment2(req.body);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Due payment created.",
  });
});

// update due payment2

const updateDuePayment2 = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.updateDuePayment2(req.params.id,req.body)
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Due payment updated",
  });
});

// get due payment

const getDuePayment2 = catchAsync(async (req: Request, res: Response) => {
  const data = await shopService.getDuepayments2()
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "All duepayments2",
  });
});

const shopController = {
  createDuepayment2,
  getDuePayment2,
  updateDuePayment2,

  aDueUserAllSells,
  getADueUserPayment,
  duePay,
  getASpecificDateSells,
  getAllSells,
  createProduct,
  deleteProduct,
  findProduct,
  createDueCustomer,
  getdueCustomer,
  createASell,
  updateProduct,
};
export default shopController;
