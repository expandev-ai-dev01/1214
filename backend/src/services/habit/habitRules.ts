/**
 * @summary
 * Business logic for habit management operations
 *
 * @module habit
 */

import { dbRequest, ExpectedReturn } from '@/utils/database';
import {
  HabitCreateRequest,
  HabitUpdateRequest,
  HabitListRequest,
  HabitResponse,
  WeekDay,
} from './habitTypes';

/**
 * @summary
 * Creates a new habit for a user
 *
 * @function habitCreate
 * @module habit
 *
 * @param {HabitCreateRequest} params - Habit creation parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} params.name - Habit name
 * @param {string} [params.description] - Habit description
 * @param {FrequencyType} params.frequencyType - Frequency type
 * @param {WeekDay[]} [params.weekDays] - Days of the week
 * @param {number[]} [params.monthDays] - Days of the month
 * @param {string} [params.scheduledTime] - Scheduled time
 * @param {number} [params.estimatedMinutes] - Estimated duration
 * @param {Date} params.startDate - Start date
 * @param {number} [params.idCategory] - Category identifier
 *
 * @returns {Promise<HabitResponse>} Created habit entity
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const habit = await habitCreate({
 *   idAccount: 1,
 *   idUser: 123,
 *   name: 'Exercício matinal',
 *   frequencyType: FrequencyType.Daily,
 *   weekDays: [WeekDay.Monday, WeekDay.Wednesday, WeekDay.Friday],
 *   startDate: new Date()
 * });
 */
export async function habitCreate(params: HabitCreateRequest): Promise<HabitResponse> {
  /**
   * @rule {be-database-requirement} Transform arrays to JSON for database storage
   */
  const transformedParams = {
    idAccount: params.idAccount,
    idUser: params.idUser,
    name: params.name,
    description: params.description || null,
    frequencyType: params.frequencyType,
    weekDays: params.weekDays ? JSON.stringify(params.weekDays) : null,
    monthDays: params.monthDays ? JSON.stringify(params.monthDays) : null,
    scheduledTime: params.scheduledTime || null,
    estimatedMinutes: params.estimatedMinutes || null,
    startDate: params.startDate,
    idCategory: params.idCategory || null,
  };

  const result = await dbRequest(
    '[functional].[spHabitCreate]',
    transformedParams,
    ExpectedReturn.Single
  );

  /**
   * @rule {be-json-data-handling} Parse JSON fields from database
   */
  return {
    ...result,
    weekDays: result.weekDays ? JSON.parse(result.weekDays) : null,
    monthDays: result.monthDays ? JSON.parse(result.monthDays) : null,
  };
}

/**
 * @summary
 * Lists habits for a user with optional filters
 *
 * @function habitList
 * @module habit
 *
 * @param {HabitListRequest} params - List parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} [params.filterStatus] - Status filter
 * @param {number} [params.idCategory] - Category filter
 * @param {string} [params.orderBy] - Sort order
 *
 * @returns {Promise<HabitResponse[]>} Array of habits
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const habits = await habitList({
 *   idAccount: 1,
 *   idUser: 123,
 *   filterStatus: 'ativos',
 *   orderBy: 'nome_asc'
 * });
 */
export async function habitList(params: HabitListRequest): Promise<HabitResponse[]> {
  const result = await dbRequest(
    '[functional].[spHabitList]',
    {
      idAccount: params.idAccount,
      idUser: params.idUser,
      filterStatus: params.filterStatus || 'ativos',
      idCategory: params.idCategory || null,
      orderBy: params.orderBy || 'data_cadastro_desc',
    },
    ExpectedReturn.Multiple
  );

  /**
   * @rule {be-json-data-handling} Parse JSON fields for all records
   */
  return result.map((habit: any) => ({
    ...habit,
    weekDays: habit.weekDays ? JSON.parse(habit.weekDays) : null,
    monthDays: habit.monthDays ? JSON.parse(habit.monthDays) : null,
  }));
}

/**
 * @summary
 * Retrieves a specific habit by ID
 *
 * @function habitGet
 * @module habit
 *
 * @param {object} params - Get parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {number} params.id - Habit identifier
 *
 * @returns {Promise<HabitResponse>} Habit entity
 *
 * @throws {ValidationError} When habit not found
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const habit = await habitGet({
 *   idAccount: 1,
 *   idUser: 123,
 *   id: 456
 * });
 */
export async function habitGet(params: {
  idAccount: number;
  idUser: number;
  id: number;
}): Promise<HabitResponse> {
  const result = await dbRequest('[functional].[spHabitGet]', params, ExpectedReturn.Single);

  /**
   * @rule {be-json-data-handling} Parse JSON fields from database
   */
  return {
    ...result,
    weekDays: result.weekDays ? JSON.parse(result.weekDays) : null,
    monthDays: result.monthDays ? JSON.parse(result.monthDays) : null,
  };
}

/**
 * @summary
 * Updates an existing habit
 *
 * @function habitUpdate
 * @module habit
 *
 * @param {HabitUpdateRequest} params - Update parameters
 *
 * @returns {Promise<HabitResponse>} Updated habit entity
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const habit = await habitUpdate({
 *   idAccount: 1,
 *   idUser: 123,
 *   id: 456,
 *   name: 'Exercício atualizado',
 *   frequencyType: FrequencyType.Daily,
 *   weekDays: [WeekDay.Monday],
 *   startDate: new Date(),
 *   status: HabitStatus.Active
 * });
 */
export async function habitUpdate(params: HabitUpdateRequest): Promise<HabitResponse> {
  /**
   * @rule {be-database-requirement} Transform arrays to JSON for database storage
   */
  const transformedParams = {
    idAccount: params.idAccount,
    idUser: params.idUser,
    id: params.id,
    name: params.name,
    description: params.description || null,
    frequencyType: params.frequencyType,
    weekDays: params.weekDays ? JSON.stringify(params.weekDays) : null,
    monthDays: params.monthDays ? JSON.stringify(params.monthDays) : null,
    scheduledTime: params.scheduledTime || null,
    estimatedMinutes: params.estimatedMinutes || null,
    startDate: params.startDate,
    idCategory: params.idCategory || null,
    status: params.status,
  };

  const result = await dbRequest(
    '[functional].[spHabitUpdate]',
    transformedParams,
    ExpectedReturn.Single
  );

  /**
   * @rule {be-json-data-handling} Parse JSON fields from database
   */
  return {
    ...result,
    weekDays: result.weekDays ? JSON.parse(result.weekDays) : null,
    monthDays: result.monthDays ? JSON.parse(result.monthDays) : null,
  };
}

/**
 * @summary
 * Soft deletes a habit
 *
 * @function habitDelete
 * @module habit
 *
 * @param {object} params - Delete parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {number} params.id - Habit identifier
 *
 * @returns {Promise<{ success: number }>} Deletion result
 *
 * @throws {ValidationError} When habit not found or user lacks permission
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const result = await habitDelete({
 *   idAccount: 1,
 *   idUser: 123,
 *   id: 456
 * });
 */
export async function habitDelete(params: {
  idAccount: number;
  idUser: number;
  id: number;
}): Promise<{ success: number }> {
  const result = await dbRequest('[functional].[spHabitDelete]', params, ExpectedReturn.Single);

  return result;
}
