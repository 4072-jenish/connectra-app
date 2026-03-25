import { Request, Response } from "express";
import postService from "../Services/postService";

export const allPosts = async (_: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    return res.json(posts);
  } catch (error) {
    console.error("allPosts error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addPost = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const userId = req.user?.id as number;
    const content = req.body.content as string;
    const file = req.file as Express.Multer.File;

    console.log(userId , content , file);
    
    const post = await postService.createPost(
      userId,
      content,
      file
    );

    return res.json(post);
  } catch (error) {
    console.error("addPost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const userId = req.user?.id as number;
    const content = req.body.content as string;
    const file = req.file as Express.Multer.File;

    console.log(userId , content , file);
    
    const post = await postService.updatePost(
      Number(req.params.id),
      userId,
      content,
      file
    );

    return res.json(post);
  } catch (error) {
    console.error("editPost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userPost = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const userId = req.user?.id as number;

    const posts = await postService.getPostsByUser(userId);
    return res.json(posts);
  } catch (error) {
    console.error("userPost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const userId = req.user?.id as number;
    const paramsId = req.params.id as unknown as number;
    
    await postService.deletePostWithRelations(paramsId , userId);
    return res.json({ message: "Deleted" });
  } catch (error) {
    console.error("deletePost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};