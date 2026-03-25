import { Request } from "express";
import {User as PrismaUser} from "@prisma/client"
import { VisualSearchParams } from "cloudinary";

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
      // Populated by `authMddleware.ts` after validating the JWT.
      user?: User;
      file?: Express.Multer.File;
    }
    // Match Prisma's user type exactly so `req.user` can be assigned
    // results returned from `prisma.user.findUnique()`.
    interface User extends PrismaUser {}
  }
}
export {};  