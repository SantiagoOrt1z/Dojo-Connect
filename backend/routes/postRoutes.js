import express from "express"
import { addPost, allPost, postId, userPosts, editPost, deletePost  } from "../controllers/postController.js"

const router = express.Router()

router.post("/add",addPost)
router.get("/all",allPost)
router.get("/:id",postId)
router.get("/",userPosts)
router.put("/:id",editPost)
router.delete("/:id",deletePost)

export default router