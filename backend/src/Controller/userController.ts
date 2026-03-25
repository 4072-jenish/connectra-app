import { Request, Response } from "express";
import prisma from "../prisma";
import userService from "../Services/userService";

export const getAllUser = async (_: Request, res: Response) => {
  const users = await userService.getAlluser();
  return res.json(users);
};

export const singleUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });

  return res.json(user);
};

export const searchUser = async (req: Request, res: Response) => {
  console.log(req.query);
  
  // const users = await userService.searchUser(req.query.search);
  // return res.json(users);
}; 