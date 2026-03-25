import { Request, Response } from "express";
import followService from "../Services/followService";

export const getFollowData = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const data = await followService.getFollowData(req.user?.id);
  // return res.json(data);
};

export const toggleFollow = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const followerId = req.user?.id;
  // const followingId = Number(req.params.id);

  // const existing = await followService.findFollow(followerId, followingId);
 
  // if (existing) {
  //   await followService.deleteFollow(followerId, followingId);
  //   return res.json({ followed: false });
  // }

  // await followService.addFollow(followerId, followingId);
  // return res.json({ followed: true });
};