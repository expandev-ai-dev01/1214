/**
 * @module HabitFormVariants
 * @summary Style variants for HabitForm component
 */

import { clsx } from 'clsx';

export interface HabitFormVariantProps {
  className?: string;
}

export function getHabitFormClassName(props: HabitFormVariantProps): string {
  const { className } = props;

  return clsx('space-y-6 bg-white p-6 rounded-lg shadow-sm', className);
}

export function getFormFieldClassName(): string {
  return clsx('space-y-2');
}

export function getFormLabelClassName(): string {
  return clsx('block text-sm font-medium text-gray-700');
}

export function getFormInputClassName(hasError: boolean = false): string {
  return clsx(
    'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500',
    {
      'border-gray-300': !hasError,
      'border-red-500': hasError,
    }
  );
}

export function getFormErrorClassName(): string {
  return clsx('text-sm text-red-600');
}

export function getFormButtonGroupClassName(): string {
  return clsx('flex gap-4 justify-end');
}

export function getFormButtonClassName(variant: 'primary' | 'secondary'): string {
  return clsx('px-4 py-2 rounded-md font-medium transition-colors', {
    'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
    'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
  });
}
