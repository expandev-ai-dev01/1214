/**
 * @api {get} /internal/habit/:id Get Habit
 * @apiName GetHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a specific habit by ID
 *
 * @apiParam {Number} id Habit identifier
 *
 * @apiSuccess {Object} habit Habit details
 *
 * @apiError {String} NotFoundError Habit not found
 * @apiError {String} UnauthorizedError User lacks permission
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import { habitGet, habitUpdate, habitDelete } from '@/services/habit';
import { zString, zNullableString, zFK, zNullableFK, zDateString } from '@/utils/zodValidation';

const securable = 'HABIT';

const getParamsSchema = z.object({
  id: zFK,
});

const updateParamsSchema = z.object({
  id: zFK,
});

const weekDaySchema = z.enum([
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'domingo',
]);
const monthDaySchema = z.number().int().min(1).max(31);

const updateBodySchema = z.object({
  name: zString.max(50, 'O nome do hábito deve ter no máximo 50 caracteres'),
  description: zNullableString.max(200, 'A descrição deve ter no máximo 200 caracteres').optional(),
  frequencyType: z.enum(['diaria', 'semanal', 'mensal']),
  weekDays: z.array(weekDaySchema).optional().nullable(),
  monthDays: z.array(monthDaySchema).optional().nullable(),
  scheduledTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'O horário deve estar no formato HH:MM')
    .optional()
    .nullable(),
  estimatedMinutes: z
    .number()
    .int()
    .min(1, 'O tempo estimado deve ser de pelo menos 1 minuto')
    .max(1440, 'O tempo estimado não pode ultrapassar 24 horas')
    .optional()
    .nullable(),
  startDate: zDateString,
  idCategory: zNullableFK.optional(),
  status: z.enum(['ativo', 'inativo', 'concluido']),
});

const deleteParamsSchema = z.object({
  id: zFK,
});

/**
 * @summary
 * Retrieves a specific habit by ID
 *
 * @function getHandler
 * @module habit
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  const [validated, error] = await operation.read(req, getParamsSchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await habitGet({
      ...validated.credential,
      ...validated.params,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}

/**
 * @summary
 * Updates an existing habit
 *
 * @function putHandler
 * @module habit
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'UPDATE' }]);

  const [validated, error] = await operation.update(req, updateParamsSchema, updateBodySchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await habitUpdate({
      ...validated.credential,
      ...validated.params,
      ...validated.body,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}

/**
 * @summary
 * Deletes a habit (soft delete)
 *
 * @function deleteHandler
 * @module habit
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'DELETE' }]);

  const [validated, error] = await operation.delete(req, deleteParamsSchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await habitDelete({
      ...validated.credential,
      ...validated.params,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}
