import mongoose from "mongoose";
import app from "./app";
import config from "./config"

async function main(){
    try{
        await mongoose.connect(config.url as string,{dbName:"Home_store"})
        app.listen(config.port,()=>{
            console.log(`this server is running at ${config.port} port.`)
        })
    }
    catch(err){
        console.log(err)
    }
}

main()