import { Request, Response, NextFunction } from "express";
export declare const regUser: (req: Request, res: Response) => Promise<Response>;
export declare const loginUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const userProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=authController.d.ts.map