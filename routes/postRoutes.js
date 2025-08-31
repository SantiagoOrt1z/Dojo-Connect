import express from "express"
import { addPost, allPost, postId, userPosts, editPost, deletePost  } from "../controllers/postController.js"
import {isAuthenticated} from "../middlewares/authMiddleware.js"
const router = express.Router()

router.post("/add", isAuthenticated, addPost)
router.get("/all",allPost)
router.get("/:id",postId)
router.get("/", isAuthenticated, userPosts)
router.put("/:id", isAuthenticated, editPost)
router.delete("/:id", isAuthenticated, deletePost)

export default router