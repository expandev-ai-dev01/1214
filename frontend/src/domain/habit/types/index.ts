/**
 * @module habit/types
 * @summary Type definitions for habit domain
 * @domain habit
 */

export type FrequencyType = 'diaria' | 'semanal' | 'mensal';

export type WeekDay = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export type HabitStatus = 'ativo' | 'inativo' | 'concluido';

export type FilterStatus = 'todos' | 'ativos' | 'inativos' | 'concluidos';

export type OrderBy =
  | 'nome_asc'
  | 'nome_desc'
  | 'data_inicio_asc'
  | 'data_inicio_desc'
  | 'data_cadastro_asc'
  | 'data_cadastro_desc';

export interface Habit {
  id: number;
  name: string;
  description?: string | null;
  frequencyType: FrequencyType;
  weekDays?: WeekDay[] | null;
  monthDays?: number[] | null;
  scheduledTime?: string | null;
  estimatedMinutes?: number | null;
  startDate: string;
  idCategory?: number | null;
  idUser: number;
  dateCreated: string;
  status: HabitStatus;
}

export interface CreateHabitDto {
  name: string;
  description?: string | null;
  frequencyType: FrequencyType;
  weekDays?: WeekDay[] | null;
  monthDays?: number[] | null;
  scheduledTime?: string | null;
  estimatedMinutes?: number | null;
  startDate: string;
  idCategory?: number | null;
}

export interface UpdateHabitDto {
  name: string;
  description?: string | null;
  frequencyType: FrequencyType;
  weekDays?: WeekDay[] | null;
  monthDays?: number[] | null;
  scheduledTime?: string | null;
  estimatedMinutes?: number | null;
  startDate: string;
  idCategory?: number | null;
  status: HabitStatus;
}

export interface HabitListParams {
  filterStatus?: FilterStatus;
  idCategory?: number | null;
  orderBy?: OrderBy;
}
