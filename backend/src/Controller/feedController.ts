import { Request, Response } from "express";
import followService from "../Services/followService";
import postService from "../Services/postService";

export const feedContent = async (req: Request, res: Response) => {
  console.log("request from feed controller", req.user?.id);  

  // const { following } = await followService.getFollowData(req.user?.id);

  // const ids = following.map((f: any) => f.followingId);

  // const posts = await postService.getPostsByUser(ids);

  // return res.json(posts);
}; 