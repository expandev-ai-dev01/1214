/**
 * @module UseHabitCreateTypes
 * @summary Type definitions for useHabitCreate hook
 */

import type { Habit, CreateHabitDto } from '../../types';

export interface UseHabitCreateReturn {
  createHabit: (data: CreateHabitDto) => Promise<Habit>;
  isCreating: boolean;
  error: Error | null;
}
