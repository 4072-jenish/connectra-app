import { Request, Response } from "express";
import followService from "../Services/followService";
import postService from "../Services/postService";

export const feedContent = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as number;

    const { following } = await followService.getFollowData(userId);

    const ids = following.map((f: any) => f.followingId);

    const posts = await postService.getPostsByUser(ids);

    return res.json(posts);
  } catch (error) {
    console.error("feedContent error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 