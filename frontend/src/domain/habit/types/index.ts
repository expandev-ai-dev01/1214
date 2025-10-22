/**
 * @module HabitTypes
 * @summary Type definitions for habit domain
 * @domain habit
 */

export enum FrequencyType {
  Daily = 'diária',
  Weekly = 'semanal',
  Monthly = 'mensal',
}

export enum WeekDay {
  Monday = 'segunda',
  Tuesday = 'terça',
  Wednesday = 'quarta',
  Thursday = 'quinta',
  Friday = 'sexta',
  Saturday = 'sábado',
  Sunday = 'domingo',
}

export enum HabitStatus {
  Active = 'ativo',
  Inactive = 'inativo',
  Completed = 'concluído',
}

export interface Habit {
  id: number;
  usuario_id: number;
  nome_habito: string;
  descricao?: string | null;
  tipo_frequencia: FrequencyType;
  dias_semana?: WeekDay[] | null;
  dias_mes?: number[] | null;
  horario_realizacao?: string | null;
  tempo_estimado?: number | null;
  data_inicio: string;
  categoria_id?: number | null;
  data_cadastro: string;
  status: HabitStatus;
}

export interface CreateHabitDto {
  usuario_id: number;
  nome_habito: string;
  descricao?: string | null;
  tipo_frequencia: FrequencyType;
  dias_semana?: WeekDay[] | null;
  dias_mes?: number[] | null;
  horario_realizacao?: string | null;
  tempo_estimado?: number | null;
  data_inicio: string;
  categoria_id?: number | null;
}

export interface UpdateHabitDto {
  nome_habito?: string;
  descricao?: string | null;
  tipo_frequencia?: FrequencyType;
  dias_semana?: WeekDay[] | null;
  dias_mes?: number[] | null;
  horario_realizacao?: string | null;
  tempo_estimado?: number | null;
  data_inicio?: string;
  categoria_id?: number | null;
  status?: HabitStatus;
}

export interface HabitListParams {
  usuario_id: number;
  filtro_status?: 'todos' | HabitStatus;
  filtro_categoria?: number;
  ordenacao?:
    | 'nome_asc'
    | 'nome_desc'
    | 'data_inicio_asc'
    | 'data_inicio_desc'
    | 'data_cadastro_asc'
    | 'data_cadastro_desc';
}
