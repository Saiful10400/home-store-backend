import { Router } from "express"
import { productRouter } from "../Modules/product/shop.routes"


const routes=Router()


const moduleRoutes=[

    {
        path:"/shop",
        route:productRouter
    }
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))

 



export default routes