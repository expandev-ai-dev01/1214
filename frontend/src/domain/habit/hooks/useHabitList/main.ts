/**
 * @hook useHabitList
 * @summary Hook for fetching and managing list of habits
 * @domain habit
 * @type domain-hook
 * @category data
 */

import { useQuery } from '@tanstack/react-query';
import { habitService } from '../../services/habitService';
import type { UseHabitListOptions, UseHabitListReturn } from './types';

export const useHabitList = (options: UseHabitListOptions = {}): UseHabitListReturn => {
  const queryKey = ['habits', options.filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => habitService.list(options.filters),
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
