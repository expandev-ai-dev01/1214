/**
 * @service habitService
 * @summary Provides methods for all habit-related backend operations using REST API.
 * @domain habit
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Habit, CreateHabitDto, UpdateHabitDto, HabitListParams } from '../types';

export const habitService = {
  /**
   * @endpoint POST /api/v1/internal/habit
   * @summary Creates a new habit
   * @param {CreateHabitDto} data - The data for the new habit
   * @returns {Promise<Habit>} The newly created habit
   */
  async create(data: CreateHabitDto): Promise<Habit> {
    const response = await authenticatedClient.post('/habit', data);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/habit
   * @summary Fetches a list of habits with optional filters and pagination
   * @param {HabitListParams} params - Filtering and pagination parameters
   * @returns {Promise<Habit[]>} A list of habits
   */
  async list(params?: HabitListParams): Promise<Habit[]> {
    const response = await authenticatedClient.get('/habit', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/habit/:id
   * @summary Fetches a single habit by its ID
   * @param {number} id - The ID of the habit
   * @returns {Promise<Habit>} The habit object
   */
  async getById(id: number): Promise<Habit> {
    const response = await authenticatedClient.get(`/habit/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/habit/:id
   * @summary Updates an existing habit
   * @param {number} id - The ID of the habit to update
   * @param {UpdateHabitDto} data - The data to update
   * @returns {Promise<Habit>} The updated habit
   */
  async update(id: number, data: UpdateHabitDto): Promise<Habit> {
    const response = await authenticatedClient.put(`/habit/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/habit/:id
   * @summary Deletes a habit (soft delete)
   * @param {number} id - The ID of the habit to delete
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    await authenticatedClient.delete(`/habit/${id}`);
  },
};
