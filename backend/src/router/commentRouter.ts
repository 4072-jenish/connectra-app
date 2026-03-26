import { Router } from "express";
import {
  allCommentPost,
  addComment,
  editComment,
  deleteComment,
} from "../controller/commentController";

import authMiddleware from "../middleware/authMddleware";
import { validateBody, validateParams } from "../middleware/validate";
import { commentSchema } from "../validation/commentValidation";
import { idParamSchema } from "../validation/commonValidation";

const commentRouter = Router();

commentRouter.get(
  "/allComment-post/:id",
  authMiddleware,
  validateParams(idParamSchema),
  allCommentPost 
);

commentRouter.post(
  "/addComment/:id",
  authMiddleware,
  validateParams(idParamSchema),
  validateBody(commentSchema),
  addComment
);

commentRouter.put(
  "/editComment/:id",
  authMiddleware,
  validateParams(idParamSchema),
  validateBody(commentSchema),
  editComment
);

commentRouter.delete(
  "/deleteComment/:id",
  authMiddleware,
  validateParams(idParamSchema),
  deleteComment
);

export default commentRouter;