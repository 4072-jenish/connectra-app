import prisma from "../prisma";

 const getFollowData = async (userId: number) => {
  try {
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
  } catch (error) {
    console.error("followService.getFollowData error:", error);
    throw error;
  }
};

 const findFollow = async (
  followerId: number,
  followingId: number
) => {
  try {
    return await prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
  } catch (error) {
    console.error("followService.findFollow error:", error);
    throw error;
  }
};

 const addFollow = async (
  followerId: number,
  followingId: number
) => {
  try {
    return await prisma.follow.create({
      data: { followerId, followingId },
    });
  } catch (error) {
    console.error("followService.addFollow error:", error);
    throw error;
  }
};

 const deleteFollow = async (
  followerId: number,
  followingId: number
) => {
  try {
    return await prisma.follow.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
  } catch (error) {
    console.error("followService.deleteFollow error:", error);
    throw error;
  }
};

export default {
  getFollowData,
  findFollow,
  addFollow,
  deleteFollow,
}