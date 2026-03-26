import { Router } from "express";
import {
  getAllUser,
  singleUser,
  searchUser,
} from "../controller/userController";

import authMiddleware from "../middleware/authMddleware";

const userRouter = Router();

userRouter.get("/allUser", authMiddleware, getAllUser);
userRouter.get("/singleUser/:id", authMiddleware, singleUser);
userRouter.get("/search", authMiddleware, searchUser);

export default userRouter; 