import express  from "express";
import env from "dotenv"
import session from "express-session";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

env.config()


const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 120,  
  },
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",userRoutes)
app.use("/post",postRoutes)

export default app