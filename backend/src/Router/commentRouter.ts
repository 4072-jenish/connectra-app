import { Router } from "express";
import {
  allCommentPost,
  addComment,
  editComment,
  deleteComment,
} from "../Controller/commentController";

import authMiddleware from "../Middleware/authMddleware";
import { validateBody, validateParams } from "../Middleware/validate";
import { commentSchema } from "../Validation/commentValidation";
import { idParamSchema } from "../Validation/commonValidation";

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