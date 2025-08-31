import {addUserMartialArt, getAllUserMartialArts, editUserMartialArt, deleteUserMartialArt} from "../controllers/userMartialArtController.js"
import express from "express"
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/add",isAuthenticated,addUserMartialArt)
router.get("/",isAuthenticated,getAllUserMartialArts)
router.put("/edit",isAuthenticated,editUserMartialArt)
router.delete("/delete",isAuthenticated,deleteUserMartialArt)

export default router