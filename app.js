import express  from "express";
import env from "dotenv"
import userRoutes from "./routes/userRoutes.js"

env.config()
 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",userRoutes)

export default app