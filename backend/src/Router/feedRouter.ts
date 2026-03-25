import { Router } from "express";
import { feedContent } from "../Controller/feedController";
import authMiddleware from "../Middleware/authMddleware";

const feedRouter = Router();

feedRouter.get("/posts", authMiddleware, feedContent);

export default feedRouter;