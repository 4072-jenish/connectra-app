const prisma = require("../../prisma")

const getFollowData = async (userId) => {
  const [followers, following] = await Promise.all([
    prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    }),

    prisma.follow.findMany({
      where: { followerId: userId },
      select: {
        followingId: true  
      }
    })
  ]);

  return { followers, following };
};

const findFollow = async (followerId , followingId) => {
    return prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId,
                followingId
            }
        },select: {
            followingId: true
        }
    })
}

const addFollow = async (followerId , followingId) => {
    return prisma.follow.create({
        data: {
            followerId: followerId,
            followingId: followingId
        }
    })
}

const deleteFollow = async (followerId , followingId) => {
    return prisma.follow.delete ({
        where : {
            followerId_followingId: {
                followerId,
                followingId
            }
        }
    })
}
module.exports = {
    getFollowData,
    findFollow,
    addFollow,
    deleteFollow
}