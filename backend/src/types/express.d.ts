import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: Express.Multer.File;
    }

    interface User extends PrismaUser {}
  }
}

export {};

