/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { ErrorRequestHandler } from "express";
import { TerrorSource } from "../Errors/error.interface";
import appError from "../Errors/appError";
import { ZodError } from "zod";
import zodErrorHandle from "../Errors/zodErrorHandle";
import { JsonWebTokenError } from "jsonwebtoken";

const globalErrorHandler:ErrorRequestHandler=(err,req,res,next)=>{

    // setting initial value of error object property.
    let statusCode=500
    let message="Something went wrong!"
    let errorMessages:TerrorSource=[
        {
            path:"",
            message:"something went wrong!"
        }
    ]

    // manupulate defaultvalue according condition.

    if(err instanceof appError){
        statusCode=err.statusCode
        message=err.message
        errorMessages = [
            {
              path: '',
              message: err?.message,
            },
          ];
    }
    else if(err instanceof ZodError){
        const zodError=zodErrorHandle(err)
        statusCode=zodError.statusCode
        message=zodError.message
        errorMessages=zodError.errorSources
    }
    else if(err instanceof JsonWebTokenError){
       
        statusCode=400
        message=err.message
    }

    return res.status(statusCode).send({
        success:false,
        message,
        errorMessages,
        // err,
        stack:err?.stack||null
    })
}

export default globalErrorHandler