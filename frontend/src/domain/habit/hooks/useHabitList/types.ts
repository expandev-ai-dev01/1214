/**
 * @module UseHabitListTypes
 * @summary Type definitions for useHabitList hook
 */

import type { Habit, HabitListParams } from '../../types';

export interface UseHabitListOptions {
  filters: HabitListParams;
  enabled?: boolean;
}

export interface UseHabitListReturn {
  habits: Habit[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
