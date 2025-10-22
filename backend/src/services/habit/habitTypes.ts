/**
 * @module habit
 * @description Type definitions for habit management
 */

/**
 * @enum FrequencyType
 * @description Types of habit frequency
 */
export enum FrequencyType {
  Daily = 'diaria',
  Weekly = 'semanal',
  Monthly = 'mensal',
}

/**
 * @enum HabitStatus
 * @description Status values for habits
 */
export enum HabitStatus {
  Active = 'ativo',
  Inactive = 'inativo',
  Completed = 'concluido',
}

/**
 * @enum WeekDay
 * @description Days of the week in Portuguese
 */
export enum WeekDay {
  Monday = 'segunda',
  Tuesday = 'terca',
  Wednesday = 'quarta',
  Thursday = 'quinta',
  Friday = 'sexta',
  Saturday = 'sabado',
  Sunday = 'domingo',
}

/**
 * @interface HabitEntity
 * @description Represents a habit entity in the system
 *
 * @property {number} id - Unique habit identifier
 * @property {number} idAccount - Associated account identifier
 * @property {number} idUser - User identifier who owns the habit
 * @property {string} name - Name of the habit
 * @property {string | null} description - Detailed description of the habit
 * @property {FrequencyType} frequencyType - Type of frequency (daily, weekly, monthly)
 * @property {string | null} weekDays - JSON array of week days
 * @property {string | null} monthDays - JSON array of month days
 * @property {string | null} scheduledTime - Scheduled time in HH:MM format
 * @property {number | null} estimatedMinutes - Estimated time in minutes
 * @property {Date} startDate - Start date for the habit
 * @property {number | null} idCategory - Category identifier
 * @property {HabitStatus} status - Current habit status
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface HabitEntity {
  id: number;
  idAccount: number;
  idUser: number;
  name: string;
  description: string | null;
  frequencyType: FrequencyType;
  weekDays: string | null;
  monthDays: string | null;
  scheduledTime: string | null;
  estimatedMinutes: number | null;
  startDate: Date;
  idCategory: number | null;
  status: HabitStatus;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}

/**
 * @interface HabitCreateRequest
 * @description Parameters for creating a new habit
 */
export interface HabitCreateRequest {
  idAccount: number;
  idUser: number;
  name: string;
  description?: string | null;
  frequencyType: FrequencyType;
  weekDays?: WeekDay[] | null;
  monthDays?: number[] | null;
  scheduledTime?: string | null;
  estimatedMinutes?: number | null;
  startDate: Date;
  idCategory?: number | null;
}

/**
 * @interface HabitUpdateRequest
 * @description Parameters for updating an existing habit
 */
export interface HabitUpdateRequest {
  idAccount: number;
  idUser: number;
  id: number;
  name: string;
  description?: string | null;
  frequencyType: FrequencyType;
  weekDays?: WeekDay[] | null;
  monthDays?: number[] | null;
  scheduledTime?: string | null;
  estimatedMinutes?: number | null;
  startDate: Date;
  idCategory?: number | null;
  status: HabitStatus;
}

/**
 * @interface HabitListRequest
 * @description Parameters for listing habits with filters
 */
export interface HabitListRequest {
  idAccount: number;
  idUser: number;
  filterStatus?: 'todos' | 'ativos' | 'inativos' | 'concluidos';
  idCategory?: number | null;
  orderBy?:
    | 'nome_asc'
    | 'nome_desc'
    | 'data_inicio_asc'
    | 'data_inicio_desc'
    | 'data_cadastro_asc'
    | 'data_cadastro_desc';
}

/**
 * @interface HabitResponse
 * @description Response format for habit operations
 */
export interface HabitResponse {
  id: number;
  idAccount: number;
  idUser: number;
  name: string;
  description: string | null;
  frequencyType: FrequencyType;
  weekDays: WeekDay[] | null;
  monthDays: number[] | null;
  scheduledTime: string | null;
  estimatedMinutes: number | null;
  startDate: Date;
  idCategory: number | null;
  status: HabitStatus;
  dateCreated: Date;
  dateModified: Date;
}
