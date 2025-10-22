import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component
 * @description Displays a loading indicator with customizable size
 */
export const LoadingSpinner = ({ size = 'medium', className }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className={getLoadingSpinnerClassName({ size, className })} />
    </div>
  );
};
