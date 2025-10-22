import dotenv from 'dotenv';

/**
 * @summary
 * Application configuration management
 *
 * @module instances/config/appConfig
 */

// Load environment variables
dotenv.config();

/**
 * @interface AppConfig
 * @description Application configuration structure
 *
 * @property {object} server - Server configuration
 * @property {object} api - API configuration
 * @property {object} cache - Cache configuration
 */
interface AppConfig {
  server: {
    port: number;
    nodeEnv: string;
  };
  api: {
    version: string;
    cors: {
      origin: string | string[];
      credentials: boolean;
      methods: string[];
      allowedHeaders: string[];
      exposedHeaders: string[];
      maxAge: number;
    };
  };
  cache: {
    ttl: number;
    checkPeriod: number;
  };
}

/**
 * @constant config
 * @description Application configuration object
 */
export const config: AppConfig = {
  server: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  api: {
    version: process.env.API_VERSION || 'v1',
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.CORS_ORIGINS?.split(',') || []
          : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400,
    },
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600'),
    checkPeriod: parseInt(process.env.CACHE_CHECK_PERIOD || '600'),
  },
};
