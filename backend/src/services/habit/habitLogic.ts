/**
 * @summary
 * Habit business logic operations
 *
 * @module services/habit/habitLogic
 */

import {
  HabitEntity,
  HabitCreateRequest,
  HabitUpdateRequest,
  HabitListFilters,
  HabitListResponse,
  HabitStatus,
} from './habitTypes';

// In-memory storage
let habits: HabitEntity[] = [];
let nextId = 1;

/**
 * @summary
 * Creates a new habit
 *
 * @function habitCreate
 * @module habit
 *
 * @param {HabitCreateRequest} params - Habit creation parameters
 *
 * @returns {Promise<HabitEntity>} Created habit entity
 *
 * @throws {Error} When validation fails
 *
 * @example
 * const habit = await habitCreate({
 *   usuario_id: 1,
 *   nome_habito: 'Exercício',
 *   tipo_frequencia: FrequencyType.Daily,
 *   dias_semana: [WeekDay.Monday, WeekDay.Wednesday],
 *   data_inicio: new Date()
 * });
 */
export async function habitCreate(params: HabitCreateRequest): Promise<HabitEntity> {
  const newHabit: HabitEntity = {
    id: nextId++,
    usuario_id: params.usuario_id,
    nome_habito: params.nome_habito,
    descricao: params.descricao || null,
    tipo_frequencia: params.tipo_frequencia,
    dias_semana: params.dias_semana || null,
    dias_mes: params.dias_mes || null,
    horario_realizacao: params.horario_realizacao || null,
    tempo_estimado: params.tempo_estimado || null,
    data_inicio: params.data_inicio,
    categoria_id: params.categoria_id || null,
    data_cadastro: new Date(),
    status: HabitStatus.Active,
  };

  habits.push(newHabit);
  return newHabit;
}

/**
 * @summary
 * Retrieves a habit by ID
 *
 * @function habitGet
 * @module habit
 *
 * @param {number} id - Habit identifier
 * @param {number} usuario_id - User identifier
 *
 * @returns {Promise<HabitEntity | null>} Habit entity or null if not found
 *
 * @example
 * const habit = await habitGet(1, 1);
 */
export async function habitGet(id: number, usuario_id: number): Promise<HabitEntity | null> {
  const habit = habits.find((h) => h.id === id && h.usuario_id === usuario_id);
  return habit || null;
}

/**
 * @summary
 * Lists habits with filters
 *
 * @function habitList
 * @module habit
 *
 * @param {HabitListFilters} filters - List filters
 *
 * @returns {Promise<HabitListResponse[]>} Array of habits
 *
 * @example
 * const habitList = await habitList({
 *   usuario_id: 1,
 *   filtro_status: HabitStatus.Active
 * });
 */
export async function habitList(filters: HabitListFilters): Promise<HabitListResponse[]> {
  let filtered = habits.filter((h) => h.usuario_id === filters.usuario_id);

  // Apply status filter
  if (filters.filtro_status && filters.filtro_status !== 'todos') {
    filtered = filtered.filter((h) => h.status === filters.filtro_status);
  }

  // Apply category filter
  if (filters.filtro_categoria !== undefined) {
    filtered = filtered.filter((h) => h.categoria_id === filters.filtro_categoria);
  }

  // Apply sorting
  if (filters.ordenacao) {
    switch (filters.ordenacao) {
      case 'nome_asc':
        filtered.sort((a, b) => a.nome_habito.localeCompare(b.nome_habito));
        break;
      case 'nome_desc':
        filtered.sort((a, b) => b.nome_habito.localeCompare(a.nome_habito));
        break;
      case 'data_inicio_asc':
        filtered.sort((a, b) => a.data_inicio.getTime() - b.data_inicio.getTime());
        break;
      case 'data_inicio_desc':
        filtered.sort((a, b) => b.data_inicio.getTime() - a.data_inicio.getTime());
        break;
      case 'data_cadastro_asc':
        filtered.sort((a, b) => a.data_cadastro.getTime() - b.data_cadastro.getTime());
        break;
      case 'data_cadastro_desc':
        filtered.sort((a, b) => b.data_cadastro.getTime() - a.data_cadastro.getTime());
        break;
    }
  }

  return filtered.map((h) => ({
    id: h.id,
    nome_habito: h.nome_habito,
    descricao: h.descricao,
    tipo_frequencia: h.tipo_frequencia,
    status: h.status,
    data_inicio: h.data_inicio,
    categoria_id: h.categoria_id,
  }));
}

/**
 * @summary
 * Updates an existing habit
 *
 * @function habitUpdate
 * @module habit
 *
 * @param {HabitUpdateRequest} params - Update parameters
 *
 * @returns {Promise<HabitEntity>} Updated habit entity
 *
 * @throws {Error} When habit not found or user is not owner
 *
 * @example
 * const updated = await habitUpdate({
 *   id: 1,
 *   usuario_id: 1,
 *   nome_habito: 'Exercício Matinal'
 * });
 */
export async function habitUpdate(params: HabitUpdateRequest): Promise<HabitEntity> {
  const index = habits.findIndex((h) => h.id === params.id && h.usuario_id === params.usuario_id);

  if (index === -1) {
    throw new Error('Hábito não encontrado ou você não tem permissão para editá-lo');
  }

  const habit = habits[index];

  // Update only provided fields
  if (params.nome_habito !== undefined) habit.nome_habito = params.nome_habito;
  if (params.descricao !== undefined) habit.descricao = params.descricao;
  if (params.tipo_frequencia !== undefined) habit.tipo_frequencia = params.tipo_frequencia;
  if (params.dias_semana !== undefined) habit.dias_semana = params.dias_semana;
  if (params.dias_mes !== undefined) habit.dias_mes = params.dias_mes;
  if (params.horario_realizacao !== undefined) habit.horario_realizacao = params.horario_realizacao;
  if (params.tempo_estimado !== undefined) habit.tempo_estimado = params.tempo_estimado;
  if (params.data_inicio !== undefined) habit.data_inicio = params.data_inicio;
  if (params.categoria_id !== undefined) habit.categoria_id = params.categoria_id;
  if (params.status !== undefined) habit.status = params.status;

  habits[index] = habit;
  return habit;
}

/**
 * @summary
 * Deletes a habit (logical deletion)
 *
 * @function habitDelete
 * @module habit
 *
 * @param {number} id - Habit identifier
 * @param {number} usuario_id - User identifier
 *
 * @returns {Promise<boolean>} True if deleted successfully
 *
 * @throws {Error} When habit not found or user is not owner
 *
 * @example
 * await habitDelete(1, 1);
 */
export async function habitDelete(id: number, usuario_id: number): Promise<boolean> {
  const index = habits.findIndex((h) => h.id === id && h.usuario_id === usuario_id);

  if (index === -1) {
    throw new Error('Hábito não encontrado ou você não tem permissão para excluí-lo');
  }

  // Logical deletion - change status to inactive
  habits[index].status = HabitStatus.Inactive;
  return true;
}
