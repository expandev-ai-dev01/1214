/**
 * @api {post} /internal/habit Create Habit
 * @apiName CreateHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new habit with the specified parameters
 *
 * @apiParam {String} name Habit name (max 50 characters)
 * @apiParam {String} [description] Habit description (max 200 characters)
 * @apiParam {String} frequencyType Frequency type: 'diaria', 'semanal', 'mensal'
 * @apiParam {Array} [weekDays] Days of the week (required for daily/weekly)
 * @apiParam {Array} [monthDays] Days of the month (required for monthly)
 * @apiParam {String} [scheduledTime] Scheduled time in HH:MM format
 * @apiParam {Number} [estimatedMinutes] Estimated duration (1-1440)
 * @apiParam {Date} startDate Start date (cannot be in the past)
 * @apiParam {Number} [idCategory] Category identifier
 *
 * @apiSuccess {Number} id Habit identifier
 * @apiSuccess {String} name Habit name
 * @apiSuccess {Date} dateCreated Creation timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} UnauthorizedError User lacks permission
 * @apiError {String} ServerError Internal server error
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import {
  habitCreate,
  habitList,
  habitGet,
  habitUpdate,
  habitDelete,
  FrequencyType,
  HabitStatus,
  WeekDay,
} from '@/services/habit';
import { zString, zNullableString, zFK, zNullableFK, zDateString } from '@/utils/zodValidation';

const securable = 'HABIT';

// Validation schemas
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

const createBodySchema = z.object({
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
});

const listQuerySchema = z.object({
  filterStatus: z.enum(['todos', 'ativos', 'inativos', 'concluidos']).optional(),
  idCategory: zNullableFK.optional(),
  orderBy: z
    .enum([
      'nome_asc',
      'nome_desc',
      'data_inicio_asc',
      'data_inicio_desc',
      'data_cadastro_asc',
      'data_cadastro_desc',
    ])
    .optional(),
});

const getParamsSchema = z.object({
  id: zFK,
});

const updateParamsSchema = z.object({
  id: zFK,
});

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
 * Creates a new habit
 *
 * @function postHandler
 * @module habit
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  const [validated, error] = await operation.create(req, createBodySchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await habitCreate({
      ...validated.credential,
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
 * Lists habits with optional filters
 *
 * @function getHandler
 * @module habit
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  const [validated, error] = await operation.read(req, listQuerySchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await habitList({
      ...validated.credential,
      ...validated.query,
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
