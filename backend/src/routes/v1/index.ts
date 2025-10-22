import { Router } from 'express';
import externalRoutes from '@/routes/v1/externalRoutes';
import internalRoutes from '@/routes/v1/internalRoutes';

/**
 * @summary
 * V1 API router configuration
 *
 * @module routes/v1
 */

const router = Router();

// External (public) routes - /api/v1/external/...
router.use('/external', externalRoutes);

// Internal (authenticated) routes - /api/v1/internal/...
router.use('/internal', internalRoutes);

export default router;
