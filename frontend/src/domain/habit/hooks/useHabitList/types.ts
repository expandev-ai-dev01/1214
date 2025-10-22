/**
 * @module habit/hooks/useHabitList/types
 * @summary Type definitions for useHabitList hook
 */

import type { Habit, HabitListParams } from '../../types';

export interface UseHabitListOptions {
  filters?: HabitListParams;
}

export interface UseHabitListReturn {
  data: Habit[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
