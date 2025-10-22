/**
 * @hook useHabitUpdate
 * @summary Hook for updating existing habits
 * @domain habit
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { habitService } from '../../services/habitService';
import type { UseHabitUpdateReturn } from './types';

export const useHabitUpdate = (): UseHabitUpdateReturn => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: update,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => habitService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  return {
    update: (id, data) => update({ id, data }),
    isUpdating,
    error: error as Error | null,
  };
};
