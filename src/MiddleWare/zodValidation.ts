import { AnyZodObject } from "zod";
import catchAsync from "../Utility/catchAsync";
import { NextFunction, Request, Response } from "express";

const zodValidation=(schema:AnyZodObject)=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

        await schema.parseAsync(req.body)
        next()
    })
}


export default zodValidation