const express = require("express");
const {
  allCommentPost,
  addComment,
  editComment,
  deleteComment
} = require("../Controller/commentController");

const authMiddleware = require("../Middleware/authMddleware");
const { validateBody, validateParams } = require("../Middleware/validate");
const { commentSchema } = require("../Validation/commentValidation");
const { idParamSchema } = require("../Validation/commonValidation");

const commentRouter = express.Router();

// GET COMMENTS
commentRouter.get(
  "/allComment-post/:id",
  authMiddleware,
  validateParams(idParamSchema),
  allCommentPost
);

// ADD COMMENT
commentRouter.post(
  "/addComment/:id",
  authMiddleware,
  validateParams(idParamSchema),
  validateBody(commentSchema),
  addComment
);

// EDIT COMMENT
commentRouter.put(
  "/editComment/:id",
  authMiddleware,
  validateParams(idParamSchema),
  validateBody(commentSchema),
  editComment
);

// DELETE COMMENT
commentRouter.delete(
  "/deleteComment/:id",
  authMiddleware,
  validateParams(idParamSchema),
  deleteComment
);

module.exports = commentRouter;