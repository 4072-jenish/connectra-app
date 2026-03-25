import prisma from "../prisma";
import { Comment } from "@prisma/client";

 const allCommentOfPost = async (postId: number) => {
  return prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: { id: true, name: true, avatar: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

 const findComment = async (
  commentId: number,
  userId: number
): Promise<Comment | null> => {
  return prisma.comment.findUnique({
    where: { id: commentId },
  });
};

 const addComment = async (
  userId: number,
  postId: number,
  text: string
): Promise<Comment> => {
  return prisma.comment.create({
    data: { userId, postId, text },
  });
};

 const editCommnet = async (
  commentId: number,
  text: string
): Promise<Comment> => {
  return prisma.comment.update({
    where: { id: commentId },
    data: { text },
  });
};

 const deleteComment = async (
  commentId: number,
  userId: number
) => {
  return prisma.comment.delete({
    where: { id: commentId },
  });
};

export default {
  allCommentOfPost,
  findComment,
  addComment,
  editCommnet,
  deleteComment,
}