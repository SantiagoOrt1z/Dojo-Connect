import { registerUser,editUser,deleteUser,loginUser,getSessionUser,logoutUser } from "../controllers/userController.js";
import express from "express"
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/register", registerUser)
router.put("/", isAuthenticated, editUser)
router.delete("/",isAuthenticated,deleteUser)
router.post("/login", loginUser)
router.get("/me", getSessionUser);
router.post("/logout", logoutUser);


export default router