import prisma from "../prisma";

 const getFollowData = async (userId: number) => {
  const [followers, following] = await Promise.all([
    prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: { id: true, name: true, email: true, avatar: true },
        },
      },
    }),
    prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    }),
  ]);

  return { followers, following };
};

 const findFollow = async (
  followerId: number,
  followingId: number
) => {
  return prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId },
    },
  });
};

 const addFollow = async (
  followerId: number,
  followingId: number
) => {
  return prisma.follow.create({
    data: { followerId, followingId },
  });
};

 const deleteFollow = async (
  followerId: number,
  followingId: number
) => {
  return prisma.follow.delete({
    where: {
      followerId_followingId: { followerId, followingId },
    },
  });
};

export default {
  getFollowData,
  findFollow,
  addFollow,
  deleteFollow,
}