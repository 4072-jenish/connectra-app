import { Router } from "express";
import {
  toggleFollow,
  getFollowData,
} from "../controller/followerController";

import authMiddleware from "../middleware/authMddleware";
import { validateParams } from "../middleware/validate";
import { idParamSchema } from "../validation/commonValidation";

const followRouter = Router();

followRouter.get("/getFollowData", authMiddleware, getFollowData);

followRouter.post(
  "/followUser/:id",
  authMiddleware,
  validateParams(idParamSchema),
  toggleFollow
);

export default followRouter;