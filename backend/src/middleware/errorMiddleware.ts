import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * @summary
 * Global error handling middleware
 *
 * @module middleware/errorMiddleware
 *
 * @param {Error} error - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction): void {
  // Zod validation errors
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.errors,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Custom application errors
  if (error.statusCode) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code || 'APPLICATION_ERROR',
        message: error.message,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Generic server errors
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
    timestamp: new Date().toISOString(),
  });
}
