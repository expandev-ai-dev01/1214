/**
 * @module UseHabitDeleteTypes
 * @summary Type definitions for useHabitDelete hook
 */

export interface UseHabitDeleteReturn {
  deleteHabit: (variables: { id: number; usuario_id: number }) => Promise<void>;
  isDeleting: boolean;
  error: Error | null;
}
