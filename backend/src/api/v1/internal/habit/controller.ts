/**
 * @summary
 * Habit API controller
 *
 * @module api/v1/internal/habit/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/http';
import {
  habitCreate,
  habitGet,
  habitList,
  habitUpdate,
  habitDelete,
  FrequencyType,
  WeekDay,
  HabitStatus,
} from '@/services/habit';

/**
 * @validation Create habit request schema
 */
const createSchema = z
  .object({
    usuario_id: z.number().int().positive(),
    nome_habito: z
      .string()
      .min(1)
      .max(50)
      .refine((val) => val.trim().length > 0, {
        message: 'O nome do hábito não pode conter apenas espaços em branco',
      }),
    descricao: z.string().max(200).nullable().optional(),
    tipo_frequencia: z.nativeEnum(FrequencyType),
    dias_semana: z.array(z.nativeEnum(WeekDay)).nullable().optional(),
    dias_mes: z.array(z.number().int().min(1).max(31)).nullable().optional(),
    horario_realizacao: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .nullable()
      .optional(),
    tempo_estimado: z.number().int().min(1).max(1440).nullable().optional(),
    data_inicio: z.coerce.date(),
    categoria_id: z.number().int().positive().nullable().optional(),
  })
  .refine(
    (data) => {
      if (
        data.tipo_frequencia === FrequencyType.Daily ||
        data.tipo_frequencia === FrequencyType.Weekly
      ) {
        return data.dias_semana && data.dias_semana.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia da semana',
      path: ['dias_semana'],
    }
  )
  .refine(
    (data) => {
      if (data.tipo_frequencia === FrequencyType.Monthly) {
        return data.dias_mes && data.dias_mes.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia do mês',
      path: ['dias_mes'],
    }
  )
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(data.data_inicio);
      startDate.setHours(0, 0, 0, 0);
      return startDate >= today;
    },
    {
      message: 'A data de início não pode ser anterior à data atual',
      path: ['data_inicio'],
    }
  );

/**
 * @validation Update habit request schema
 */
const updateSchema = z.object({
  nome_habito: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => val.trim().length > 0, {
      message: 'O nome do hábito não pode conter apenas espaços em branco',
    })
    .optional(),
  descricao: z.string().max(200).nullable().optional(),
  tipo_frequencia: z.nativeEnum(FrequencyType).optional(),
  dias_semana: z.array(z.nativeEnum(WeekDay)).nullable().optional(),
  dias_mes: z.array(z.number().int().min(1).max(31)).nullable().optional(),
  horario_realizacao: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .nullable()
    .optional(),
  tempo_estimado: z.number().int().min(1).max(1440).nullable().optional(),
  data_inicio: z.coerce.date().optional(),
  categoria_id: z.number().int().positive().nullable().optional(),
  status: z.nativeEnum(HabitStatus).optional(),
});

/**
 * @validation List habits query schema
 */
const listSchema = z.object({
  usuario_id: z.coerce.number().int().positive(),
  filtro_status: z
    .enum(['todos', HabitStatus.Active, HabitStatus.Inactive, HabitStatus.Completed])
    .optional(),
  filtro_categoria: z.coerce.number().int().positive().optional(),
  ordenacao: z
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

/**
 * @validation Get/Delete habit params schema
 */
const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * @api {post} /internal/habit Create Habit
 * @apiName CreateHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new habit with the specified parameters
 *
 * @apiParam {Number} usuario_id User identifier
 * @apiParam {String} nome_habito Habit name (max 50 characters)
 * @apiParam {String} [descricao] Habit description (max 200 characters)
 * @apiParam {String} tipo_frequencia Frequency type (diária, semanal, mensal)
 * @apiParam {Array} [dias_semana] Days of week (required for daily/weekly)
 * @apiParam {Array} [dias_mes] Days of month (required for monthly)
 * @apiParam {String} [horario_realizacao] Ideal time (HH:MM format)
 * @apiParam {Number} [tempo_estimado] Estimated time in minutes (1-1440)
 * @apiParam {Date} data_inicio Start date
 * @apiParam {Number} [categoria_id] Category identifier
 *
 * @apiSuccess {Object} data Created habit
 *
 * @apiError {String} ValidationError Invalid parameters provided
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = createSchema.parse(req.body);
    const habit = await habitCreate(validated);
    res.status(HTTP_STATUS.CREATED).json(successResponse(habit));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /internal/habit List Habits
 * @apiName ListHabits
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists habits with optional filters
 *
 * @apiParam {Number} usuario_id User identifier
 * @apiParam {String} [filtro_status] Status filter (todos, ativo, inativo, concluído)
 * @apiParam {Number} [filtro_categoria] Category filter
 * @apiParam {String} [ordenacao] Sort order
 *
 * @apiSuccess {Array} data Array of habits
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = listSchema.parse(req.query);
    const habits = await habitList(validated);
    res.json(successResponse(habits));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /internal/habit/:id Get Habit
 * @apiName GetHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a specific habit by ID
 *
 * @apiParam {Number} id Habit identifier
 * @apiParam {Number} usuario_id User identifier (query param)
 *
 * @apiSuccess {Object} data Habit details
 *
 * @apiError {String} NotFound Habit not found
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = paramsSchema.parse(req.params);
    const usuario_id = z.coerce.number().int().positive().parse(req.query.usuario_id);

    const habit = await habitGet(id, usuario_id);

    if (!habit) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Hábito não encontrado', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(habit));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {put} /internal/habit/:id Update Habit
 * @apiName UpdateHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing habit
 *
 * @apiParam {Number} id Habit identifier
 * @apiParam {Number} usuario_id User identifier
 *
 * @apiSuccess {Object} data Updated habit
 *
 * @apiError {String} NotFound Habit not found
 * @apiError {String} Forbidden User is not the owner
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = paramsSchema.parse(req.params);
    const bodyValidated = updateSchema.parse(req.body);
    const usuario_id = z.coerce.number().int().positive().parse(req.body.usuario_id);

    const habit = await habitUpdate({
      id,
      usuario_id,
      ...bodyValidated,
    });

    res.json(successResponse(habit));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR', error.errors));
    } else if (error.message.includes('não encontrado') || error.message.includes('permissão')) {
      res.status(HTTP_STATUS.FORBIDDEN).json(errorResponse(error.message, 'FORBIDDEN'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /internal/habit/:id Delete Habit
 * @apiName DeleteHabit
 * @apiGroup Habit
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a habit (logical deletion)
 *
 * @apiParam {Number} id Habit identifier
 * @apiParam {Number} usuario_id User identifier (query param)
 *
 * @apiSuccess {Boolean} success Deletion confirmation
 *
 * @apiError {String} NotFound Habit not found
 * @apiError {String} Forbidden User is not the owner
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = paramsSchema.parse(req.params);
    const usuario_id = z.coerce.number().int().positive().parse(req.query.usuario_id);

    await habitDelete(id, usuario_id);

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR', error.errors));
    } else if (error.message.includes('não encontrado') || error.message.includes('permissão')) {
      res.status(HTTP_STATUS.FORBIDDEN).json(errorResponse(error.message, 'FORBIDDEN'));
    } else {
      next(error);
    }
  }
}
