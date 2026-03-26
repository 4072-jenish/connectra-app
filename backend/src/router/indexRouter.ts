import { Router } from "express";

import authRouter from "./authRouter";
import userRouter from "./userRouter";
import followRouter from "./followRouter";
import postRouter from "./postRouter";
import likeRouter from "./likeRouter";
import commentRouter from "./commentRouter";
import feedRouter from "./feedRouter";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/user", userRouter);
indexRouter.use("/follow", followRouter);
indexRouter.use("/post", postRouter);
indexRouter.use("/like", likeRouter);
indexRouter.use("/comment", commentRouter);
indexRouter.use("/feed", feedRouter);

export default indexRouter;