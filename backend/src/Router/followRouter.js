const express = require("express");
const { toggleFollow, getFollowData } = require("../Controller/followerController");

const authMiddleware = require("../Middleware/authMddleware");
const { validateParams } = require("../Middleware/validate");
const { idParamSchema } = require("../Validation/commonValidation");

const followRouter = express.Router();

followRouter.get("/getFollowData", authMiddleware, getFollowData);

followRouter.post(
  "/followUser/:id",
  authMiddleware,
  validateParams(idParamSchema),
  toggleFollow
);

module.exports = followRouter;