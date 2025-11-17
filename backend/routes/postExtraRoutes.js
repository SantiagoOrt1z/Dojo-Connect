import express from "express";
import multer from "multer";
import {
  likePost,
  unlikePost,
  addComment,
  getComments,
  addImage,
  getImages,
} from "../controllers/postExtraController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/:id/like", likePost);
router.delete("/:id/like", unlikePost);

router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);

router.post("/:id/image", upload.single("image"), addImage);
router.get("/:id/images", getImages);

export default router;