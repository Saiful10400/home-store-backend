// create product.

import mongoose from "mongoose";
import {
  dueCustomerModel,
  duePayment2model,
  duePaymentModel,
  dueSellModel,
  productModel,
  sellModel,
} from "./shop.model";
import {
  duePayment2,
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

// update product.
const updateProduct = async (id: string, payload: Partial<tProduct>) => {
  const result = await productModel.findByIdAndUpdate(id, payload);
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
  console.log(result, "new creation");
  // create dueuser payment object.
  const createDuePayment = await duePaymentModel.create({
    user: result?._id,
    amount: 0,
  });
  return { result, createDuePayment };
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
            profit:
              payload.productField.reduce(
                (acc, item) => Number(acc) + Number(item.totalProfit),
                0
              ) - Number(payload.discount || 0),
            expenses:
              payload.productField.reduce(
                (acc, item) => Number(acc) + Number(item.totalPrice),
                0
              ) - Number(payload.discount || 0),
          };
        } else {
          data = {
            products,
            Discount: payload.discount || 0,
            paymentType: payload.paymentType as "nogod" | "bakiNogod" | "baki",
            dueCustomer: new mongoose.Types.ObjectId(payload.dueCustomerId),
            profit:
              payload.productField.reduce(
                (acc, item) => Number(acc) + Number(item.totalProfit),
                0
              ) - Number(payload.discount || 0),
            expenses:
              payload.productField.reduce(
                (acc, item) => Number(acc) + Number(item.totalPrice),
                0
              ) - Number(payload.discount || 0),
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

        // add to due customer profile.
        const addToDucustomerProfile = await dueSellModel.create({
          sell: sellCollectionData._id,
          user: payload.dueCustomerId,
        });
        console.log(addToDucustomerProfile, "profile update");

        // update due customer payment schema.
        const updateDuepayment = await duePaymentModel.updateOne(
          { user: new mongoose.Types.ObjectId(payload.dueCustomerId) },
          {
            $inc: {
              amount: +payload.productField.reduce(
                (prev, item) => prev + Number(item.totalPrice),
                0
              ),
            },
          },
          { upsert: true }
        );

        result = {
          sellCollectionData,
          addToDucustomerProfile,
          updateDuepayment,
        };
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

// get all sel's .
const getAllSells = async () => {
  const result = await sellModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
        data: { $push: "$$ROOT" },
      },
    },
    { $sort: { _id: -1 } },
  ]);

  const formattedData = result.map((group) => ({
    _id: group._id,
    data: group.data.map((transaction: tsell) => ({
      ...transaction,
      products: transaction.products.map((product: tProduct) => ({
        ...product,
        quantity: parseFloat(product.quantity.toString()),
        singleBuyingPrice: parseFloat(product.singleBuyingPrice.toString()),
        singleSellingPrice: parseFloat(product.singleSellingPrice.toString()),
        totalPrice: parseFloat(product.totalPrice.toString()),
        totalProfit: parseFloat(product.totalProfit.toString()),
      })),
    })),
  }));

  return formattedData;
};
// get a particular day sells .
const getAParticularDaySells = async (payload: string) => {
  // Convert the string date to a Date object
  const [day, month, year] = payload.split("-");
  const queryDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
  const nextDate = new Date(`${year}-${month}-${Number(day) + 1}T00:00:00Z`);

  const result = await sellModel
    .find({ createdAt: { $gte: queryDate, $lt: nextDate } })
    .populate({ path: "products.name", select: "banglaName -_id" })
    .sort({ _id: -1 });

  const formatedData = result.map((item) => {
    return {
      products: item.products.map((product) => ({
        name: product.name,
        quantity: Number(product.quantity),
        singleBuyingPrice: Number(product.singleBuyingPrice),
        singleSellingPrice: Number(product.singleSellingPrice),
        totalPrice: Number(product.totalPrice),
        totalProfit: Number(product.totalProfit),
      })),
      discount: item.Discount,
      paymentType: item.paymentType,
      profit: item.profit,
      expenses: item.expenses,
      created: item.createdAt,
    };
  });

  return formatedData;
};

// get a due user all sells.
const ADueUserAllSElls = async (id: string) => {
  const result = await dueSellModel
    .find({ user: new mongoose.Types.ObjectId(id) })
    .populate("sell")
    .populate("user");

  // const formatedData = result.map((item) => {
  //   return {
  //     products: item.sell.products.map((product) => ({
  //       name: product.name,
  //       quantity: Number(product.quantity),
  //       singleBuyingPrice: Number(product.singleBuyingPrice),
  //       singleSellingPrice: Number(product.singleSellingPrice),
  //       totalPrice: Number(product.totalPrice),
  //       totalProfit: Number(product.totalProfit),
  //     })),
  //     discount: item.Discount,
  //     paymentType: item.paymentType,
  //     profit: item.profit,
  //     expenses: item.expenses,
  //     created: item.createdAt,
  //   };
  // });

  // user details.
  const user = await dueCustomerModel.findById(id).lean();

  // user payments.
  const userPayments = await duePaymentModel.findOne({
    user: new mongoose.Types.ObjectId(id),
  });

  return { user, sells: result, payments: userPayments };
};

// due pay (pay amount).
const duePay = async (id: string, amount: string) => {
  const result = await duePaymentModel.updateOne(
    { user: new mongoose.Types.ObjectId(id) },
    {
      $inc: { amount: -Number(amount) },
    }
  );

  return result;
};

// get a due rsuer payment.
const getADueUserPayment = async (id: string) => {
  const result = await duePaymentModel.findOne({
    user: new mongoose.Types.ObjectId(id),
  });
  return result;
};

// due payment 2 .

// create.
const createDuePayment2 = async (payload: duePayment2) => {
  const result = await duePayment2model.create(payload);
  return result;
};

// get
const getDuepayments2 = async () => {
  const result = await duePayment2model.find().sort({"_id":-1});
  return result;
};

// update.
const updateDuePayment2 = async (
  id: string,
  payload: { amount: number; payment: boolean }
) => {
  const result = await duePayment2model.findByIdAndUpdate(
    id,
    payload.payment
      ? { $inc: { amount: -payload.amount } }
      : { $inc: { amount: payload.amount } }
  );
  return result;
};

const shopService = {
  createDuePayment2,
  getDuepayments2,
  updateDuePayment2,

  duePay,
  getADueUserPayment,
  ADueUserAllSElls,
  getAParticularDaySells,
  createProduct,
  getAllSells,
  deleteProduct,
  getProduct,
  createDueCustomer,
  getDueCustomer,
  createASell,
  updateProduct,
};

export default shopService;
