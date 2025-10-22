/**
 * @module HabitFormTypes
 * @summary Type definitions for HabitForm component
 */

import type { Habit, CreateHabitDto, UpdateHabitDto, FrequencyType, WeekDay } from '../../types';

export interface HabitFormProps {
  habit?: Habit;
  onSubmit: (data: CreateHabitDto | UpdateHabitDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface HabitFormData {
  nome_habito: string;
  descricao?: string;
  tipo_frequencia: FrequencyType;
  dias_semana?: WeekDay[];
  dias_mes?: number[];
  horario_realizacao?: string;
  tempo_estimado?: number;
  data_inicio: string;
  categoria_id?: number;
}
