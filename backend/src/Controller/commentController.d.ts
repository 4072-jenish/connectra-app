import { Request, Response } from "express";
export declare const allCommentPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=commentController.d.ts.map