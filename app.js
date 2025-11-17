import express  from "express";
import cors from "cors"
import env from "dotenv"
import session from "express-session";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import postExtraRoutes from "./routes/postExtraRoutes.js";
import userFollowRoutes from "./routes/userFollowRoutes.js"

env.config()


const app = express()

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}))


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 120,
    httpOnly: true,
    sameSite: "lax",  
    secure: false     
  }
}));


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",userRoutes)
app.use("/post",postRoutes)
app.use("/posts", postExtraRoutes);
app.use("/follows", userFollowRoutes)

export default app