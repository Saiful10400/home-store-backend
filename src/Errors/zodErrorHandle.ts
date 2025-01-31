import { ZodError, ZodIssue } from "zod";

const zodErrorHandle=(err:ZodError)=>{
    const errorSources=err.issues.map((issue:ZodIssue)=>{
        return{
            path: issue?.path[issue.path.length - 1],
            message:issue?.message
        }
    })
    return{
        statusCode:400,
        errorSources,
        message:"validation error!"
    }
}

export default zodErrorHandle