// create product.

import { productModel } from "./shop.model"
import { tProducts } from "./shop.types"

const createProduct=async(payload:tProducts)=>{
const result=await productModel.create(payload)
return result
}


const deleteProduct=async(id:string)=>{
    const result=await productModel.findByIdAndDelete(id)
    return result
}

const getProduct=async(id?:string,searchTerm?:string)=>{
    let result
    if(id){
        result=await productModel.findById(id)
    }
    else if(searchTerm){ 
        const regx=new RegExp(searchTerm,"i")
        result=await productModel.find({$or:[{englishName:regx},{banglaName:regx}]})
    }
    else{
        result=await productModel.find()
    }

    return result
}


const shopService={
createProduct,deleteProduct,getProduct
}

export default shopService