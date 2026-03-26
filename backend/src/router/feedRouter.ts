import { Router } from "express";
import { feedContent } from "../controller/feedController";
import authMiddleware from "../middleware/authMddleware";

const feedRouter = Router();

feedRouter.get("/posts", authMiddleware, feedContent);

export default feedRouter;