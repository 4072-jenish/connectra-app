import { Request, Response } from "express";
import likeService from "../Services/likeService";

export const allLikewithPost = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const likes = await likeService.getAllLikes(req.params.id);
  // return res.json(likes);
};

export const toggleLike = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const userId = req.user?.id;
  // const postId = Number(req.params.id);

  // const exist = await likeService.findLike(userId, postId);

  // if (exist) {
  //   await likeService.deleteLike(userId, postId);
  //   return res.json({ message: "Unliked" });
  // }

  // await likeService.addLike(userId, postId);
  // return res.json({ message: "Liked" });
};