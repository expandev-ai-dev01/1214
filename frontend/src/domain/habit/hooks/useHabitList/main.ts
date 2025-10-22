/**
 * @hook useHabitList
 * @summary Hook for fetching and managing habit list
 * @domain habit
 * @type domain-hook
 * @category data
 */

import { useQuery } from '@tanstack/react-query';
import { habitService } from '../../services/habitService';
import type { UseHabitListOptions, UseHabitListReturn } from './types';

export const useHabitList = (options: UseHabitListOptions): UseHabitListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['habits', filters],
    queryFn: () => habitService.list(filters),
    enabled,
  });

  return {
    habits: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
