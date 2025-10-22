/**
 * @module HabitListTypes
 * @summary Type definitions for HabitList component
 */

import type { Habit } from '../../types';

export interface HabitListProps {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  isLoading?: boolean;
}
