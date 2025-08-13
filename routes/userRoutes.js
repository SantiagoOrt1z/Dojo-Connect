import { registerUser,editUser,deleteUser } from "../controllers/userController.js";
import express from "express"

const router = express.Router()

router.post("/", registerUser)
router.put("/", editUser)
router.delete("/",deleteUser)
router.post("/login")

export default router