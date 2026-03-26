import { Request, Response } from "express";
import likeService from "../Services/likeService";

export const allLikewithPost = async (req: Request, res: Response) => {
  try {
    const paramId = Number(req.params.id) ;
    console.log(typeof(paramId));
    
    
    const likes = await likeService.getAllLikes(paramId);
    return res.json(likes);
  } catch (error) {
    console.error("allLikewithPost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  try {
    
    const userId = req.user?.id as number;
    const postId = Number(req.params.id);

    const exist = await likeService.findLike(userId, postId);

    if (exist) {
      await likeService.deleteLike(userId, postId);
      return res.json({ message: "Unliked" });
    }

    await likeService.addLike(userId, postId);
    return res.json({ message: "Liked" });
  } catch (error) {
    console.error("toggleLike error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};