/**
 * @hook useHabitDelete
 * @summary Hook for deleting habits
 * @domain habit
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitService } from '../../services/habitService';
import type { UseHabitDeleteReturn } from './types';

export const useHabitDelete = (): UseHabitDeleteReturn => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: remove,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: habitService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  return {
    remove,
    isDeleting,
    error: error as Error | null,
  };
};
