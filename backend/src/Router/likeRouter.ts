import { Router } from "express";
import {
  allLikewithPost,
  toggleLike,
} from "../Controller/likeController";

import authMiddleware from "../Middleware/authMddleware";

const likeRouter = Router();

likeRouter.get("/allLike-post/:id", authMiddleware, allLikewithPost);
likeRouter.post("/toggleLike/:id", authMiddleware, toggleLike);

export default likeRouter;