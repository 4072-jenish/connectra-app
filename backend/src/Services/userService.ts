import prisma from "../prisma";
import { User } from "@prisma/client";

 const getAlluser = async (): Promise<User[]> => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("userService.getAlluser error:", error);
    throw error;
  }
};

 const findUser = async (id: number): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.error("userService.findUser error:", error);
    throw error;
  }
};

 const searchUser = async (search: string) => {
  try {
    return await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    });
  } catch (error) {
    console.error("userService.searchUser error:", error);
    throw error;
  }
};

export default {
  getAlluser,
  findUser,
  searchUser,
}