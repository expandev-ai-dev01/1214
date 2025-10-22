/**
 * @module habit/components/HabitList/types
 * @summary Type definitions for HabitList component
 */

import type { Habit } from '../../types';

export interface HabitListProps {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}
