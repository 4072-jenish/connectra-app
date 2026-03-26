import prisma from "../../prisma/prisma";

 const addLike = async (userId: number, postId: number) => {
  try {
    return await prisma.like.create({ data: { userId, postId } });
  } catch (error) {
    console.error("likeService.addLike error:", error);
    throw error;
  }
};

 const deleteLike = async (userId: number, postId: number) => {
  try {
    return await prisma.like.delete({
      where: { userId_postId: { userId, postId } },
    });
  } catch (error) {
    console.error("likeService.deleteLike error:", error);
    throw error;
  }
};

 const getAllLikes = async (postId: number) => {
  try {
    return await prisma.like.findMany({ where: { postId } });
  } catch (error) {
    console.error("likeService.getAllLikes error:", error);
    throw error;
  }
};

 const findLike = async (userId: number, postId: number) => {
  try {
    return await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });
  } catch (error) {
    console.error("likeService.findLike error:", error);
    throw error;
  }
};

export default {
  addLike,
  deleteLike,
  getAllLikes,
  findLike,
}