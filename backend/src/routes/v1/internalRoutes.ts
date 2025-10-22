import { Router } from 'express';
import * as habitController from '@/api/v1/internal/habit/controller';

/**
 * @summary
 * Internal (authenticated) API routes configuration
 *
 * @module routes/v1/internalRoutes
 */

const router = Router();

// Habit routes
router.post('/habit', habitController.postHandler);
router.get('/habit', habitController.listHandler);
router.get('/habit/:id', habitController.getHandler);
router.put('/habit/:id', habitController.putHandler);
router.delete('/habit/:id', habitController.deleteHandler);

export default router;
