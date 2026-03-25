import prisma from "../prisma";
import { User } from "@prisma/client";

 const getAlluser = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

 const findUser = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

 const searchUser = async (search: string) => {
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
  });
};

export default {
  getAlluser,
  findUser,
  searchUser,
}