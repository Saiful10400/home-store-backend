// create product.

import mongoose from "mongoose";
import {
  dueCustomerModel,
 
  productModel,
  sellModel,
} from "./shop.model";
import {
  tDuecustomer,
  
  tProduct,
  tProducts,
  tsell,
} from "./shop.types";
import appError from "../../Errors/appError";

const createProduct = async (payload: tProducts) => {
  const result = await productModel.create(payload);
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await productModel.findByIdAndDelete(id);
  return result;
};

const getProduct = async (id?: string, searchTerm?: string) => {
  let result;
  if (id) {
    result = await productModel.findById(id);
  } else if (searchTerm) {
    const regx = new RegExp(searchTerm, "i");
    result = await productModel.find({
      $or: [{ englishName: regx }, { banglaName: regx }],
    });
  } else {
    result = await productModel.find();
  }

  return result;
};

// due.

const createDueCustomer = async (payload: tDuecustomer) => {
  const result = await dueCustomerModel.create(payload);
  return result;
};

// get due customer.
const getDueCustomer = async () => {
  const result = await dueCustomerModel.find();
  return result;
};

// create a sell.
const createASell = async (payload: {
  productField: {
    id: number;
    singleBuyingPrice: string;
    singleSellingPrice: string;
    totalProfit: string;
    volume: string;
    product: string;
    totalPrice: string;
  }[];
  dueCustomerId: string;
  discount: number;
  paymentType: string;
}) => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      let result;
      const addToSellCollection = async () => {
        const products: tProduct[] = payload.productField.map((item) => ({
          name: new mongoose.Types.ObjectId(item.product),
          quantity: mongoose.Types.Decimal128.fromString(item.volume),
          singleBuyingPrice: mongoose.Types.Decimal128.fromString(
            item.singleBuyingPrice
          ),
          singleSellingPrice: mongoose.Types.Decimal128.fromString(
            item.singleSellingPrice
          ),
          totalPrice: mongoose.Types.Decimal128.fromString(item.totalPrice),
          totalProfit: mongoose.Types.Decimal128.fromString(item.totalProfit),
        }));
        let data: tsell;
        if (payload.paymentType === "nogod") {
          data = {
            products,
            Discount: payload.discount || 0,
            paymentType: payload.paymentType as "nogod" | "bakiNogod" | "baki",
            profit: payload.productField.reduce(
              (acc, item) => Number(acc) + Number(item.totalProfit),
              0
            ),
          };
        } else {
          data = {
            products,
            Discount: payload.discount || 0,
            paymentType: payload.paymentType as "nogod" | "bakiNogod" | "baki",
            dueCustomer: new mongoose.Types.ObjectId(payload.dueCustomerId),
            profit: payload.productField.reduce(
              (acc, item) => Number(acc) + Number(item.totalProfit),
              0
            ),
          };
        }
        const response = await sellModel.create(data);
        return response;
      };

      // if the payment process is "nogod."
      if (payload.paymentType === "nogod") {
        const response = await addToSellCollection();
        result = response;
      } else if (payload.paymentType === "bakiNogod") {
        const sellCollectionData = await addToSellCollection();
        result = { sellCollectionData };
      } else if (payload.paymentType === "baki") {
        const sellCollectionData = await addToSellCollection();
        result = { sellCollectionData };
      }
      return result;
    });
    session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw new appError(500, "SEll createion failed");
  }
};

const shopService = {
  createProduct,
  deleteProduct,
  getProduct,
  createDueCustomer,
  getDueCustomer,
  createASell,
};

export default shopService;
