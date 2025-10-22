/**
 * @module habit/hooks/useHabitUpdate/types
 * @summary Type definitions for useHabitUpdate hook
 */

import type { Habit, UpdateHabitDto } from '../../types';

export interface UseHabitUpdateReturn {
  update: (id: number, data: UpdateHabitDto) => Promise<Habit>;
  isUpdating: boolean;
  error: Error | null;
}
