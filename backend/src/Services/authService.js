const passport = require('passport');
const prisma = require('../../prisma');

const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    });
}

const createUser = async (data) => {
    return await prisma.user.create({
        data
    });
}

const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    });
}

const getFullUserProfile = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      posts: {
        include: {
          likes: true,
          comments: true
        }
      },
      followers: {
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
      },
      following: {
        include: {
          following: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          }
        }
      }
    }
  });
};

const editedUser = async (id , data) => {
    return await prisma.user.update({
                  where,
                  data : {
                      name,
                      email,
                      bio,
                      avatar
                  }
                });

} 

const deleteUserWithRelation = async (userID) => {
    return await prisma.$transaction(async (tx) => {

    const user = await tx.user.findUnique({
      where: { id: Number(userID) }
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    await tx.follow.deleteMany({
      where: {
        OR: [
          { followerId: userID },
          { followingId: userID }
        ]
      }
    });

    await tx.like.deleteMany({
      where: { userId: userID }
    });

    await tx.comment.deleteMany({
      where: { userId: userID }
    });

    await tx.post.deleteMany({
      where: { authorId: userID }
    });

    const deletedUser = await tx.user.delete({
      where: { id: userID }
    });

    return deletedUser;
  });
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById,
    getFullUserProfile,
    editedUser,
    deleteUserWithRelation
}