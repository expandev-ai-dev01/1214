/**
 * @service habitService
 * @summary Habit management service for authenticated endpoints
 * @domain habit
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Habit, CreateHabitDto, UpdateHabitDto, HabitListParams } from '../types';
import type { ApiResponse } from '@/core/types';

export const habitService = {
  /**
   * @endpoint POST /api/v1/internal/habit
   * @summary Creates new habit
   */
  async create(data: CreateHabitDto): Promise<Habit> {
    const response = await authenticatedClient.post<ApiResponse<Habit>>('/habit', data);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/habit
   * @summary Fetches list of habits with filters
   */
  async list(params: HabitListParams): Promise<Habit[]> {
    const response = await authenticatedClient.get<ApiResponse<Habit[]>>('/habit', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/habit/:id
   * @summary Fetches single habit by ID
   */
  async getById(id: number, usuario_id: number): Promise<Habit> {
    const response = await authenticatedClient.get<ApiResponse<Habit>>(`/habit/${id}`, {
      params: { usuario_id },
    });
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/habit/:id
   * @summary Updates existing habit
   */
  async update(id: number, usuario_id: number, data: UpdateHabitDto): Promise<Habit> {
    const response = await authenticatedClient.put<ApiResponse<Habit>>(`/habit/${id}`, {
      ...data,
      usuario_id,
    });
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/habit/:id
   * @summary Deletes habit
   */
  async delete(id: number, usuario_id: number): Promise<void> {
    await authenticatedClient.delete(`/habit/${id}`, {
      params: { usuario_id },
    });
  },
};
