import { Request } from "express";
import {User as PrismaUser} from "@prisma/client"

// interface AuthUser extends Request{
//   id: number;
//   email: string;
//   name?: string;
// }

// interface User {
//   id: number;  
//   name: string;  
//   email: string;  
//   password: string;  
//   bio?: string;  
//   avatar?: string;  
//   createdAt?: Date;  
//   isVerified?: boolean;
// }

declare global {
  namespace Express {
    interface Request {
      user? : PrismaUser;
      file?: Express.Multer.File;
    }
  }
}
export {};  