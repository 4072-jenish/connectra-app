import { Request, Response } from "express";
import commentService from "../Services/commentService";

export const allCommentPost = async (req: Request, res: Response) => {
  try {
    // This endpoint uses `:id` as `postId` (see `commentRouter`).
    const postId = req.params.id as unknown as number; // validated by `validateParams`
    const comments = await commentService.allCommentOfPost(postId);
    return res.json(comments);
  } catch (error) {
    console.error("allCommentPost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req: Request, res: Response) => {
    try {
      console.log("From addComment controller",req.user);
  const userId = req.user?.id as number;
  const paramsId = req.params.id as unknown as number;
  const text = req.body.comment as string;
  
  console.log(userId , paramsId, text);
  
  const comment = await commentService.addComment(
    userId, paramsId, text
  );
  return res.json(comment);
    } catch (error) { 
      console.error("addComment error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}; 

export const editComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id as unknown as number; // validated by `validateParams`
    const text = req.body.comment as string; // validated by `validateBody`
    const comment = await commentService.editCommnet(commentId, text);
    return res.json(comment);
  } catch (error) {
    console.error("editComment error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as number;
    const commentId = req.params.id as unknown as number; // validated by `validateParams`
    await commentService.deleteComment(commentId, userId);
    return res.json({ message: "Deleted" });
  } catch (error) {
    console.error("deleteComment error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};