import { Router } from "express";
import {
  addPost,
  allPosts,
  userPost,
  editPost,
  deletePost,
} from "../controller/postController";

import authMiddleware from "../middleware/authMddleware";
import upload from "../middleware/upload";

const postRouter = Router();

postRouter.get("/allPost", authMiddleware, allPosts);
postRouter.get("/userPost", authMiddleware, userPost);

postRouter.post(
  "/addPost",
  authMiddleware,
  upload.single("image"),
  addPost
);

postRouter.put(
  "/editPost/:id",
  authMiddleware,
  upload.single("image"),
  editPost
);

postRouter.delete("/deletePost/:id", authMiddleware, deletePost);

export default postRouter;