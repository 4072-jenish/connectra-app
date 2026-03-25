import { Router } from "express";
import {
  toggleFollow,
  getFollowData,
} from "../Controller/followerController";

import authMiddleware from "../Middleware/authMddleware";
import { validateParams } from "../Middleware/validate";
import { idParamSchema } from "../Validation/commonValidation";

const followRouter = Router();

followRouter.get("/getFollowData", authMiddleware, getFollowData);

followRouter.post(
  "/followUser/:id",
  authMiddleware,
  validateParams(idParamSchema),
  toggleFollow
);

export default followRouter;