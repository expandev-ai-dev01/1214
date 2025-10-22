import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas for reuse across the application
 *
 * @module utils/zodValidation/commonSchemas
 */

/**
 * @validation String validation (1-255 characters)
 */
export const zString = z.string().min(1).max(255);

/**
 * @validation Nullable string validation
 */
export const zNullableString = z.string().max(255).nullable();

/**
 * @validation Name validation (1-100 characters)
 */
export const zName = z.string().min(1).max(100);

/**
 * @validation Description validation (nullable, max 500 characters)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @validation Positive integer validation
 */
export const zPositiveInt = z.number().int().positive();

/**
 * @validation Non-negative integer validation
 */
export const zNonNegativeInt = z.number().int().min(0);

/**
 * @validation Boolean bit validation (0 or 1)
 */
export const zBit = z.union([z.literal(0), z.literal(1)]);

/**
 * @validation Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @validation Email validation
 */
export const zEmail = z.string().email().max(255);

/**
 * @validation UUID validation
 */
export const zUUID = z.string().uuid();

/**
 * @validation Pagination page number
 */
export const zPage = z.coerce.number().int().positive().default(1);

/**
 * @validation Pagination page size
 */
export const zPageSize = z.coerce.number().int().positive().max(100).default(50);
