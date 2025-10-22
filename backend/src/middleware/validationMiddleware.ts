import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

/**
 * @summary
 * Request validation middleware factory
 *
 * @module middleware/validationMiddleware
 *
 * @param {ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware function
 */
export function validationMiddleware(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}
