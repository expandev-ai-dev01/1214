import { format as dateFnsFormat } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * @utility formatDate
 * @summary Formats date to Brazilian format
 */
export const formatDate = (date: Date | string, formatStr: string = 'dd/MM/yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateFnsFormat(dateObj, formatStr, { locale: ptBR });
};

/**
 * @utility formatDateTime
 * @summary Formats date and time to Brazilian format
 */
export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};
