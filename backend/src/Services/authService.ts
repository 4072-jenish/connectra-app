import prisma from "../prisma";
import { Prisma, User } from "@prisma/client";

 const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error("authService.getUserByEmail error:", error);
    throw error;
  }
};

 const createUser = async (
  data: Prisma.UserCreateInput
): Promise<User> => {
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    console.error("authService.createUser error:", error);
    throw error;
  }
};

 const getUserById = async (id: number): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.error("authService.getUserById error:", error);
    throw error;
  }
};

 const getFullUserProfile = async (id: number) => {
  try {
    return await prisma.user.findUnique({
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
  } catch (error) {
    console.error("authService.getFullUserProfile error:", error);
    throw error;
  }
};

 const editedUser = async (
  id: number,
  data: any): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        bio: data.bio,
        avatar: data.avatar,
      },
    });
  } catch (error) {
    console.error("authService.editedUser error:", error);
    throw error;
  }
};

 const verifiedUser = async (
  email: string,
  data: any
): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { email },
      data: {
        isVerified: data.isVerified,
        otp: data.otp,
        otpExpiry: data.otpExpiry,
      },
    });
  } catch (error) {
    console.error("authService.verifiedUser error:", error);
    throw error;
  }
};

 const deleteUserWithRelation = async (userID: number) => {
  try {
    return await prisma.$transaction(async (tx) => {
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
  } catch (error) {
    console.error("authService.deleteUserWithRelation error:", error);
    throw error;
  }
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