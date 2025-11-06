import express from "express";
import {
  follow,
  unfollow,
  followers,
  following,
} from "../controllers/userFollowController.js";

const router = express.Router();

router.post("/follow", follow);
router.post("/unfollow", unfollow);
router.get("/followers", followers);
router.get("/following", following);

export default router;
