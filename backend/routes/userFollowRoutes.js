import express from "express";
import {
  follow,
  unfollow,
  followers,
  following,
} from "../controllers/userFollowController.js";

const router = express.Router();

router.post("/:userId/follow", follow);      
router.delete("/:userId/follow", unfollow);  
router.get("/followers", followers);        
router.get("/following", following);   

export default router;
