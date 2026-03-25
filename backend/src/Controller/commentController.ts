import { Request, Response } from "express";
import commentService from "../Services/commentService";

export const allCommentPost = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const comments = await commentService.allCommentOfPost(req.params.id);
  // return res.json(comments);
};

export const addComment = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const comment = await commentService.addComment(
  //   req.user?.id,
  //   req.params.id,
  //   req.body.comment
  // );
  // return res.json(comment);
}; 

export const editComment = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const comment = await commentService.editCommnet(
  //   req.params.id,
  //   req.body.comment
  // );
  // return res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // await commentService.deleteComment(req.params.id, req.user?.id);
  // return res.json({ message: "Deleted" });
};