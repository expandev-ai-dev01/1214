/**
 * @summary
 * Habit domain type definitions
 *
 * @module services/habit/habitTypes
 */

/**
 * @enum FrequencyType
 * @description Types of habit frequency
 */
export enum FrequencyType {
  Daily = 'diária',
  Weekly = 'semanal',
  Monthly = 'mensal',
}

/**
 * @enum HabitStatus
 * @description Habit status values
 */
export enum HabitStatus {
  Active = 'ativo',
  Inactive = 'inativo',
  Completed = 'concluído',
}

/**
 * @enum WeekDay
 * @description Days of the week
 */
export enum WeekDay {
  Monday = 'segunda',
  Tuesday = 'terça',
  Wednesday = 'quarta',
  Thursday = 'quinta',
  Friday = 'sexta',
  Saturday = 'sábado',
  Sunday = 'domingo',
}

/**
 * @interface HabitEntity
 * @description Represents a habit entity in the system
 *
 * @property {number} id - Unique habit identifier
 * @property {number} usuario_id - User identifier
 * @property {string} nome_habito - Habit name
 * @property {string | null} descricao - Habit description
 * @property {FrequencyType} tipo_frequencia - Frequency type
 * @property {WeekDay[] | null} dias_semana - Days of week (for daily/weekly)
 * @property {number[] | null} dias_mes - Days of month (for monthly)
 * @property {string | null} horario_realizacao - Ideal time for habit (HH:MM)
 * @property {number | null} tempo_estimado - Estimated time in minutes
 * @property {Date} data_inicio - Start date
 * @property {number | null} categoria_id - Category identifier
 * @property {Date} data_cadastro - Registration timestamp
 * @property {HabitStatus} status - Current status
 */
export interface HabitEntity {
  id: number;
  usuario_id: number;
  nome_habito: string;
  descricao: string | null;
  tipo_frequencia: FrequencyType;
  dias_semana: WeekDay[] | null;
  dias_mes: number[] | null;
  horario_realizacao: string | null;
  tempo_estimado: number | null;
  data_inicio: Date;
  categoria_id: number | null;
  data_cadastro: Date;
  status: HabitStatus;
}

/**
 * @interface HabitCreateRequest
 * @description Parameters for creating a new habit
 */
export interface HabitCreateRequest {
  usuario_id: number;
  nome_habito: string;
  descricao?: string | null;
  tipo_frequencia: FrequencyType;
  dias_semana?: WeekDay[] | null;
  dias_mes?: number[] | null;
  horario_realizacao?: string | null;
  tempo_estimado?: number | null;
  data_inicio: Date;
  categoria_id?: number | null;
}

/**
 * @interface HabitUpdateRequest
 * @description Parameters for updating an existing habit
 */
export interface HabitUpdateRequest {
  id: number;
  usuario_id: number;
  nome_habito?: string;
  descricao?: string | null;
  tipo_frequencia?: FrequencyType;
  dias_semana?: WeekDay[] | null;
  dias_mes?: number[] | null;
  horario_realizacao?: string | null;
  tempo_estimado?: number | null;
  data_inicio?: Date;
  categoria_id?: number | null;
  status?: HabitStatus;
}

/**
 * @interface HabitListFilters
 * @description Filters for listing habits
 */
export interface HabitListFilters {
  usuario_id: number;
  filtro_status?: HabitStatus | 'todos';
  filtro_categoria?: number;
  ordenacao?:
    | 'nome_asc'
    | 'nome_desc'
    | 'data_inicio_asc'
    | 'data_inicio_desc'
    | 'data_cadastro_asc'
    | 'data_cadastro_desc';
}

/**
 * @interface HabitListResponse
 * @description Response for habit list
 */
export interface HabitListResponse {
  id: number;
  nome_habito: string;
  descricao: string | null;
  tipo_frequencia: FrequencyType;
  status: HabitStatus;
  data_inicio: Date;
  categoria_id: number | null;
}
