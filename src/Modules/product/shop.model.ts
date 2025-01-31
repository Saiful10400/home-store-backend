import { model, Schema } from "mongoose";
import { tProducts } from "./shop.types";

const roomSchema=new Schema<tProducts>({
    englishName: {
      type: String,
      required: true
    },
    banglaName: {
      type: String,
      required: true
    },
    buyingPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
   
  });


  export const productModel=model<tProducts>("product",roomSchema)