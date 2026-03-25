import { Request, Response } from "express";
import postService from "../Services/postService";

export const allPosts = async (_: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  return res.json(posts);
};

export const addPost = async (req: Request, res: Response) => {
   console.log(req.user);
   
  // const post = await postService.createPost(

  //   req.user?.id,
  //   req.body.content,
  //   req.file
  // );

  // return res.json(post);
};

export const editPost = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const post = await postService.updatePost(
  //   Number(req.params.id),
  //   req.user?.id,
  //   req.body.content,
  //   req.file
  // );

  // return res.json(post);
};

export const userPost = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // const posts = await postService.getPostsByUser(req.user?.id);
  // return res.json(posts);
};

export const deletePost = async (req: Request, res: Response) => {
  console.log(req.user);
  
  // await postService.deletePostWithRelations(req.params.id, req.user?.id);
  // return res.json({ message: "Deleted" });
};