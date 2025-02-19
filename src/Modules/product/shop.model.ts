import mongoose, { model, Schema } from "mongoose";
import { tDuecustomer, tDueSell, tProducts, tsell } from "./shop.types";

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
});

export const productModel = model<tProducts>("product", productSchema);

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

const sellSchema = new Schema<tsell>(
  {
    products: [
      {
        name: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"product",
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

const dueSellSchema = new Schema<tDueSell>(
  {
    products: [
      {
        name: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
        price: { type: Number, require: true },
        totalPrice: { type: Number, require: true },
      },
    ],
    Discount: {
      type: Number,
    },
    dueCustomer: { type: String, required: false },
    paymentType: { type: String, required: true },
    paid: { type: Number, required: false },
    due: { type: Number, required: true },
  },
  { timestamps: true }
);

export const dueSellModel = model<tDueSell>("dueSell", dueSellSchema);
