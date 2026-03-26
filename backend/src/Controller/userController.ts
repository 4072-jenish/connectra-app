import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import userService from "../Services/userService";

export const getAllUser = async (_: Request, res: Response) => {
  try {
    const users = await userService.getAlluser();
    return res.json(users);
  } catch (error) {
    console.error("getAllUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const singleUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    return res.json(user);
  } catch (error) {
    console.error("singleUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    
    const users = await userService.searchUser(search);
    
    return res.json(users);
  } catch (error) {
    console.error("searchUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; 