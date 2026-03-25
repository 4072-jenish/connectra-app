import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

interface JwtPayload {
  email: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader?.split(" ")[1];

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    if (!decoded || typeof decoded === "string" || !decoded.email) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const existUser = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });

    if (!existUser) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log("existing user from middleware" ,existUser);
    
    req.user = existUser; 

    console.log(req.user);
    
    console.log("leaving the auth middleware");
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;