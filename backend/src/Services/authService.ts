import prisma from "../prisma";
import { Prisma, User } from "@prisma/client";

 const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

 const createUser = async (
  data: Prisma.UserCreateInput
): Promise<User> => {
  return prisma.user.create({ data });
};

 const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

 const getFullUserProfile = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        include: { likes: true, comments: true },
      },
      followers: {
        include: {
          follower: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
      },
      following: {
        include: {
          following: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
      },
    },
  });
};

 const editedUser = async (
  id: number,
  data: any): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      bio: data.bio,
      avatar: data.avatar,
    },
  });
};

 const verifiedUser = async (
  email: string,
  data: any
): Promise<User> => {
  return prisma.user.update({
    where: { email },
    data: {
      isVerified: data.isVerified,
      otp: data.otp,
      otpExpiry: data.otpExpiry,
    },
  });
};

 const deleteUserWithRelation = async (userID: number) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userID } });

    if (!user) throw new Error("USER_NOT_FOUND");

    await tx.follow.deleteMany({
      where: {
        OR: [{ followerId: userID }, { followingId: userID }],
      },
    });

    await tx.like.deleteMany({ where: { userId: userID } });
    await tx.comment.deleteMany({ where: { userId: userID } });
    await tx.post.deleteMany({ where: { authorId: userID } });

    return tx.user.delete({ where: { id: userID } });
  });
};

export default {
  getUserByEmail,
  createUser,
  getUserById,
  getFullUserProfile,
  editedUser,
  verifiedUser,
  deleteUserWithRelation,
}