/**
 * @module habit/hooks/useHabitCreate/types
 * @summary Type definitions for useHabitCreate hook
 */

import type { Habit, CreateHabitDto } from '../../types';

export interface UseHabitCreateReturn {
  create: (data: CreateHabitDto) => Promise<Habit>;
  isCreating: boolean;
  error: Error | null;
}
