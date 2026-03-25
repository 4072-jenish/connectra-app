import { Request, Response, NextFunction } from "express";
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
export default authMiddleware;
//# sourceMappingURL=authMddleware.d.ts.map