/**
 * @component HabitList
 * @summary List component for displaying habits
 * @domain habit
 * @type domain-component
 * @category display
 */

import { formatDate } from '@/core/utils/format';
import type { HabitListProps } from './types';
import {
  getHabitListClassName,
  getHabitCardClassName,
  getHabitHeaderClassName,
  getHabitTitleClassName,
  getHabitDescriptionClassName,
  getHabitMetaClassName,
  getHabitBadgeClassName,
  getHabitActionsClassName,
  getHabitActionButtonClassName,
  getEmptyStateClassName,
} from './variants';

const frequencyLabels: Record<string, string> = {
  diária: 'Diária',
  semanal: 'Semanal',
  mensal: 'Mensal',
};

const statusLabels: Record<string, string> = {
  ativo: 'Ativo',
  inativo: 'Inativo',
  concluído: 'Concluído',
};

export const HabitList = ({ habits, onEdit, onDelete, isLoading = false }: HabitListProps) => {
  if (isLoading) {
    return (
      <div className={getEmptyStateClassName()}>
        <p>Carregando hábitos...</p>
      </div>
    );
  }

  if (!habits || habits.length === 0) {
    return (
      <div className={getEmptyStateClassName()}>
        <p>Nenhum hábito cadastrado ainda.</p>
        <p className="text-sm mt-2">Comece criando seu primeiro hábito!</p>
      </div>
    );
  }

  return (
    <div className={getHabitListClassName()}>
      {habits.map((habit) => (
        <div key={habit.id} className={getHabitCardClassName()}>
          <div className={getHabitHeaderClassName()}>
            <div className="flex-1">
              <h3 className={getHabitTitleClassName()}>{habit.nome_habito}</h3>
              {habit.descricao && (
                <p className={getHabitDescriptionClassName()}>{habit.descricao}</p>
              )}
            </div>
            <div className={getHabitActionsClassName()}>
              <button
                onClick={() => onEdit(habit)}
                className={getHabitActionButtonClassName('edit')}
                title="Editar hábito"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(habit)}
                className={getHabitActionButtonClassName('delete')}
                title="Excluir hábito"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={getHabitMetaClassName()}>
            <span className={getHabitBadgeClassName('frequency')}>
              {frequencyLabels[habit.tipo_frequencia]}
            </span>
            <span className={getHabitBadgeClassName('status')}>{statusLabels[habit.status]}</span>
            {habit.horario_realizacao && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {habit.horario_realizacao}
              </span>
            )}
            {habit.tempo_estimado && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {habit.tempo_estimado} min
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Início: {formatDate(habit.data_inicio)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
