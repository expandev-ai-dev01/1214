/**
 * @module habit/components/HabitForm/types
 * @summary Type definitions for HabitForm component
 */

import type { Habit, CreateHabitDto, UpdateHabitDto } from '../../types';

export interface HabitFormProps {
  habit?: Habit;
  onSubmit: (data: CreateHabitDto | UpdateHabitDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}
