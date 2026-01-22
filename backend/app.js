import express  from "express";
import cors from "cors"
import env from "dotenv"
import session,{MemoryStore} from "express-session";
import pgSession from "connect-pg-simple"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import postExtraRoutes from "./routes/postExtraRoutes.js";
import userFollowRoutes from "./routes/userFollowRoutes.js"

env.config()

const PostgresSessionStore = pgSession(session)

const app = express()

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))


app.use(session({
  secret: process.env.SESSION_SECRET || "test-secret-123",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  },
  store: new MemoryStore({
    checkPeriod: 86400
  })
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",userRoutes)
app.use("/post",postRoutes)
app.use("/posts", postExtraRoutes);
app.use("/user", userFollowRoutes)

export default app