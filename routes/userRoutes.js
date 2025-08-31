import { registerUser,editUser,deleteUser,loginUser } from "../controllers/userController.js";
import express from "express"
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/register", registerUser)
router.put("/:id", isAuthenticated, editUser)
router.delete("/:id",isAuthenticated,deleteUser)
router.post("/login", loginUser)

export default router