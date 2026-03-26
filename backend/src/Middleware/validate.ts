import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      console.error("validateBody failed:", JSON.stringify(error?.errors ?? error));
      return res.status(400).json({
        errors: error.errors.map((e: any) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }
  }; 

export const validateParams = 
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      
      req.params = schema.parse(req.params) as typeof req.params;
      next();
    } catch (error: any) {
      // Useful during debugging: tells you exactly why `:id` didn't validate.
      console.error("validateParams failed:", JSON.stringify(error?.errors ?? error));
      return res.status(400).json({
        message: "Invalid params",
      });
    }
  };