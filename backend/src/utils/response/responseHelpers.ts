/**
 * @summary
 * Standard API response formatting utilities
 *
 * @module utils/response/responseHelpers
 */

/**
 * @interface SuccessResponse
 * @description Standard success response structure
 *
 * @property {boolean} success - Success flag (always true)
 * @property {T} data - Response data
 * @property {object} [metadata] - Optional metadata
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 *
 * @property {boolean} success - Success flag (always false)
 * @property {object} error - Error details
 * @property {string} timestamp - Error timestamp
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @interface PagedResponse
 * @description Paginated response structure
 *
 * @property {boolean} success - Success flag
 * @property {T[]} data - Array of data items
 * @property {object} metadata - Pagination metadata
 */
export interface PagedResponse<T> {
  success: true;
  data: T[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
    timestamp: string;
  };
}

/**
 * @summary
 * Creates a standard success response
 *
 * @function successResponse
 * @module utils/response
 *
 * @param {T} data - Response data
 * @param {object} [additionalMetadata] - Optional additional metadata
 *
 * @returns {SuccessResponse<T>} Formatted success response
 */
export function successResponse<T>(data: T, additionalMetadata?: object): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...additionalMetadata,
    },
  };
}

/**
 * @summary
 * Creates a standard error response
 *
 * @function errorResponse
 * @module utils/response
 *
 * @param {string} message - Error message
 * @param {string} [code] - Error code
 * @param {any} [details] - Additional error details
 *
 * @returns {ErrorResponse} Formatted error response
 */
export function errorResponse(message: string, code = 'ERROR', details?: any): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Creates a paginated response
 *
 * @function pagedResponse
 * @module utils/response
 *
 * @param {T[]} data - Array of data items
 * @param {number} page - Current page number
 * @param {number} pageSize - Items per page
 * @param {number} total - Total number of items
 *
 * @returns {PagedResponse<T>} Formatted paginated response
 */
export function pagedResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number
): PagedResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      page,
      pageSize,
      total,
      hasNext: page * pageSize < total,
      hasPrevious: page > 1,
      timestamp: new Date().toISOString(),
    },
  };
}
