import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")})

export default{
    url:process.env.DB_URL,
    port:process.env.PORT,
    jwtSecret:process.env.JWT_SECRET,
    accessTokenLife:process.env.access_token_life
}