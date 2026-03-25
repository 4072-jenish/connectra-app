import { Request, Response } from "express";
import followService from "../Services/followService";

export const getFollowData = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const userId = req.user?.id as number;
    
    const data = await followService.getFollowData(userId);
    return res.json(data);
  } catch (error) {
    console.error("getFollowData error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleFollow = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    
    const followerId = req.user?.id as number;
    const followingId = Number(req.params.id);

    const existing = await followService.findFollow(followerId, followingId);
  
    if (existing) {
      await followService.deleteFollow(followerId, followingId);
      return res.json({ followed: false });
    }

    await followService.addFollow(followerId, followingId);
    return res.json({ followed: true });
  } catch (error) {
    console.error("toggleFollow error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};