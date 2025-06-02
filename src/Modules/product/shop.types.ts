import mongoose from "mongoose";

export type tProducts = {
  englishName: string;
  banglaName: string;
  buyingPrice: string;
  sellingPrice: string;
  image: string;
};
export type tDuecustomer = {
  name: mongoose.Schema.Types.ObjectId;
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
  expenses: number;
  due?:mongoose.Types.Decimal128;
  createdAt?:Date
};

export type tDueSell = {
 user: mongoose.Types.ObjectId
 sell: mongoose.Types.ObjectId
};

// due user due payment.

export type tDuePayment={
  user:mongoose.Types.ObjectId,
  amount:number
}


export type duePayment2={
  name:string,
  amount:number,
  payment:boolean
}