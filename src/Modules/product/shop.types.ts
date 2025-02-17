import mongoose from "mongoose";

export type tProducts = {
  englishName: string;
  banglaName: string;
  buyingPrice: string;
  sellingPrice: string;
  image: string;
};
export type tDuecustomer = {
  name: string;
  address: string;
  phone: string;
};

export type tDueSummery = {
  customer: mongoose.Schema.Types.ObjectId;
  productName: string;
  price: string;
};

export type tProduct={
  name: mongoose.Types.ObjectId;
  quantity: mongoose.Types.Decimal128;
  singleBuyingPrice: mongoose.Types.Decimal128;
  singleSellingPrice: mongoose.Types.Decimal128;
  totalPrice: mongoose.Types.Decimal128;
  totalProfit: mongoose.Types.Decimal128;
}

export type tsell = {
  products: tProduct[];
  Discount: number;
  dueCustomer?: mongoose.Types.ObjectId;
  paymentType: "nogod"|"bakiNogod"|"baki";
  profit: number;
  due?:mongoose.Types.Decimal128;
};

export type tDueSell = {
  products: {
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
  Discount: number | 0;
  dueCustomer?: string;
  paymentType: string;
  paid?: number;
  due: number;
};
