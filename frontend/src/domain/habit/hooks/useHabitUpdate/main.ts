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

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ id, usuario_id, data }: { id: number; usuario_id: number; data: any }) =>
      habitService.update(id, usuario_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  return {
    updateHabit: mutateAsync,
    isUpdating: isPending,
    error: error as Error | null,
  };
};
