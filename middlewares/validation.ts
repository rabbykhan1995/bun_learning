import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((e: any) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }
  };
