import { Response } from "express";

interface TsendResponse<T>{
success:boolean,
statusCode:number,
message:string,
data:T,
token?:string
}

const sendResponse=<T>(res:Response,data:TsendResponse<T>)=>{
    if(data.token){
        res.status(data.statusCode).json({
            success:data.success,
            statusCode:data.statusCode,
            message:data.message,
            token:data.token,
            data:data.data
        })
    }else{
        res.status(data.statusCode).json({
            success:data.success,
            statusCode:data.statusCode,
            message:data.message,
            data:data.data
        })
    }
}

export default sendResponse