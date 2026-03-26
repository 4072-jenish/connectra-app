import prisma from "../../prisma/prisma";
import { Comment } from "@prisma/client";

 const allCommentOfPost = async (postId: number) => {
  try {
    return await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: { id: true, name: true, avatar: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("commentService.allCommentOfPost error:", error);
    throw error;
  }
};

 const findComment = async (
  commentId: number,
  userId: number
): Promise<Comment | null> => {
  try {
    return await prisma.comment.findUnique({
      where: { id: commentId },
    });
  } catch (error) {
    console.error("commentService.findComment error:", error);
    throw error;
  }
};

 const addComment = async (
  userId: number,
  postId: number,
  text: string
): Promise<Comment> => {
  try {
    return await prisma.comment.create({
      data: { userId, postId, text },
    });
  } catch (error) {
    console.error("commentService.addComment error:", error);
    throw error;
  }
};

 const editCommnet = async (
  commentId: number,
  text: string
): Promise<Comment> => {
  try {
    return await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });
  } catch (error) {
    console.error("commentService.editCommnet error:", error);
    throw error;
  }
};

 const deleteComment = async (
  commentId: number,
  userId: number
) => {
  try {
    return await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    console.error("commentService.deleteComment error:", error);
    throw error;
  }
};

export default {
  allCommentOfPost,
  findComment,
  addComment,
  editCommnet,
  deleteComment,
}