import { Router } from "express";
import {
  allLikewithPost,
  toggleLike,
} from "../controller/likeController";

import authMiddleware from "../middleware/authMddleware";

const likeRouter = Router();

likeRouter.get("/allLike-post/:id", authMiddleware, allLikewithPost);
likeRouter.post("/toggleLike/:id", authMiddleware, toggleLike);

export default likeRouter; 