/**
 * @component HabitList
 * @summary Displays a list of habits with actions
 * @domain habit
 * @type domain-component
 * @category display
 */

import type { HabitListProps } from './types';
import type { FrequencyType, WeekDay } from '../../types';

const frequencyLabels: Record<FrequencyType, string> = {
  diaria: 'Diária',
  semanal: 'Semanal',
  mensal: 'Mensal',
};

const weekDayLabels: Record<WeekDay, string> = {
  segunda: 'Seg',
  terca: 'Ter',
  quarta: 'Qua',
  quinta: 'Qui',
  sexta: 'Sex',
  sabado: 'Sáb',
  domingo: 'Dom',
};

export const HabitList = ({ habits, onEdit, onDelete, isLoading = false }: HabitListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum hábito cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
              {habit.description && (
                <p className="mt-1 text-sm text-gray-600">{habit.description}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {frequencyLabels[habit.frequencyType]}
                </span>
                {habit.status === 'ativo' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Ativo
                  </span>
                )}
                {habit.status === 'inativo' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Inativo
                  </span>
                )}
                {habit.status === 'concluido' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Concluído
                  </span>
                )}
              </div>
              <div className="mt-3 text-sm text-gray-500">
                {habit.weekDays && habit.weekDays.length > 0 && (
                  <p>Dias: {habit.weekDays.map((d) => weekDayLabels[d]).join(', ')}</p>
                )}
                {habit.monthDays && habit.monthDays.length > 0 && (
                  <p>Dias do mês: {habit.monthDays.join(', ')}</p>
                )}
                {habit.scheduledTime && <p>Horário: {habit.scheduledTime}</p>}
                {habit.estimatedMinutes && <p>Duração estimada: {habit.estimatedMinutes} min</p>}
                <p>Início: {new Date(habit.startDate).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(habit)}
                className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir este hábito?')) {
                    onDelete(habit.id);
                  }
                }}
                className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
