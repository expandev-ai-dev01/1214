/**
 * @hook useHabitCreate
 * @summary Hook for creating new habits
 * @domain habit
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitService } from '../../services/habitService';
import type { UseHabitCreateReturn } from './types';

export const useHabitCreate = (): UseHabitCreateReturn => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: create,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: habitService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  return {
    create,
    isCreating,
    error: error as Error | null,
  };
};
