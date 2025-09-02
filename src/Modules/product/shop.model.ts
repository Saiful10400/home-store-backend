import mongoose, { model, Schema } from "mongoose";
import {
  duePayment2,
  tDuecustomer,
  tDuePayment,
  tDueSell,
  tProducts,
  tsell,
} from "./shop.types";

//  product...........
const productSchema = new Schema<tProducts>({
  englishName: {
    type: String,
    required: true,
  },
  banglaName: {
    type: String,
    required: true,
  },
  buyingPrice: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  barCode: {
    type: Number,
    required: false,
  },
  expiredDate: {
    type: Date,
    required: false,
    default: null,
  },
  stock: {
    type: Number,
    required: false,
    default: null,
  },
});

export const productModel = model<tProducts>("product", productSchema);

// Due customer..........
const dueCustomerSchema = new Schema<tDuecustomer>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    default: "N/A",
  },
  address: {
    type: String,
    required: true,
  },
});

export const dueCustomerModel = model<tDuecustomer>(
  "dueCustomer",
  dueCustomerSchema
);

// Sells..................
const sellSchema = new Schema<tsell>(
  {
    products: [
      {
        name: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          require: true,
        },
        quantity: {
          type: mongoose.Types.Decimal128,
          require: true,
        },
        singleBuyingPrice: {
          type: mongoose.Types.Decimal128,
          require: true,
        },
        singleSellingPrice: {
          type: mongoose.Types.Decimal128,
          require: true,
        },
        totalPrice: {
          type: mongoose.Types.Decimal128,
          require: true,
        },
        totalProfit: {
          type: mongoose.Types.Decimal128,
          require: true,
        },
      },
    ],
    Discount: {
      type: Number,
    },
    dueCustomer: {
      type: mongoose.Types.ObjectId,
      ref: "dueCustomer",
      required: false,
    },
    paymentType: {
      type: String,
      enum: ["nogod", "bakiNogod", "baki"],
      required: true,
    },
    profit: { type: Number, required: true },
    expenses: { type: Number, required: true },
    due: { type: mongoose.Types.Decimal128, required: false },
  },
  { timestamps: true }
);

export const sellModel = model<tsell>("sell", sellSchema);

// Due sells.............................
const dueSellSchema = new Schema<tDueSell>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "dueCustomer",
      required: true,
    },
    sell: { type: mongoose.Schema.ObjectId, ref: "sell", required: true },
  },
  { timestamps: true }
);

export const dueSellModel = model<tDueSell>("dueSell", dueSellSchema);

// Due payment ...................
const duePaymentSchema = new Schema<tDuePayment>({
  user: { type: mongoose.Schema.ObjectId, ref: "dueCustomer", required: true },
  amount: Number,
});

export const duePaymentModel = model<tDuePayment>(
  "duePayment",
  duePaymentSchema
);

//due Pyment 2.0
const duepayment2Schema = new Schema<duePayment2>(
  {
    amount: { type: Number, required: true },
    name: { type: String, required: false, unique: true },
    payment: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const duePayment2model = model<duePayment2>(
  "duePayment2",
  duepayment2Schema
);
