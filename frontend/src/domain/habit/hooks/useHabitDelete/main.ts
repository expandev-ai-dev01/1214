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

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ id, usuario_id }: { id: number; usuario_id: number }) =>
      habitService.delete(id, usuario_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  return {
    deleteHabit: mutateAsync,
    isDeleting: isPending,
    error: error as Error | null,
  };
};
