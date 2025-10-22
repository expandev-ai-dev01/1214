import { Router } from 'express';
import v1Routes from '@/routes/v1';

/**
 * @summary
 * Main API router with version management
 *
 * @module routes
 */

const router = Router();

// Version 1 (current stable)
router.use('/v1', v1Routes);

// Future versions can be added here
// router.use('/v2', v2Routes);

export default router;
