import prisma from "../prisma";

 const addLike = async (userId: number, postId: number) => {
  return prisma.like.create({ data: { userId, postId } });
};

 const deleteLike = async (userId: number, postId: number) => {
  return prisma.like.delete({
    where: { userId_postId: { userId, postId } },
  });
};

 const getAllLikes = async (postId: number) => {
  return prisma.like.findMany({ where: { postId } });
};

 const findLike = async (userId: number, postId: number) => {
  return prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });
};

export default {
  addLike,
  deleteLike,
  getAllLikes,
  findLike,
}