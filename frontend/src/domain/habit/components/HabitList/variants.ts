/**
 * @module HabitListVariants
 * @summary Style variants for HabitList component
 */

import { clsx } from 'clsx';

export function getHabitListClassName(): string {
  return clsx('space-y-4');
}

export function getHabitCardClassName(): string {
  return clsx(
    'bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'
  );
}

export function getHabitHeaderClassName(): string {
  return clsx('flex justify-between items-start mb-2');
}

export function getHabitTitleClassName(): string {
  return clsx('text-lg font-semibold text-gray-900');
}

export function getHabitDescriptionClassName(): string {
  return clsx('text-sm text-gray-600 mb-3');
}

export function getHabitMetaClassName(): string {
  return clsx('flex flex-wrap gap-2 text-xs text-gray-500');
}

export function getHabitBadgeClassName(variant: 'frequency' | 'status'): string {
  return clsx('px-2 py-1 rounded-full', {
    'bg-blue-100 text-blue-800': variant === 'frequency',
    'bg-green-100 text-green-800': variant === 'status',
  });
}

export function getHabitActionsClassName(): string {
  return clsx('flex gap-2');
}

export function getHabitActionButtonClassName(variant: 'edit' | 'delete'): string {
  return clsx('p-2 rounded-md transition-colors', {
    'text-blue-600 hover:bg-blue-50': variant === 'edit',
    'text-red-600 hover:bg-red-50': variant === 'delete',
  });
}

export function getEmptyStateClassName(): string {
  return clsx('text-center py-12 text-gray-500');
}
