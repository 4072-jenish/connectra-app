import { Request, Response } from "express";
export declare const allPosts: (_: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const userPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=postController.d.ts.map