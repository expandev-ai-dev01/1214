/**
 * @module habit/hooks/useHabitDelete/types
 * @summary Type definitions for useHabitDelete hook
 */

export interface UseHabitDeleteReturn {
  remove: (id: number) => Promise<void>;
  isDeleting: boolean;
  error: Error | null;
}
