/**
 * @module UseHabitUpdateTypes
 * @summary Type definitions for useHabitUpdate hook
 */

import type { Habit, UpdateHabitDto } from '../../types';

export interface UseHabitUpdateReturn {
  updateHabit: (variables: {
    id: number;
    usuario_id: number;
    data: UpdateHabitDto;
  }) => Promise<Habit>;
  isUpdating: boolean;
  error: Error | null;
}
