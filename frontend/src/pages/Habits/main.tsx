/**
 * @page HabitsPage
 * @summary Habits management page
 * @domain habit
 * @type list-page
 * @category habit-management
 */

import { useState } from 'react';
import { useHabitList } from '@/domain/habit/hooks/useHabitList';
import { useHabitCreate } from '@/domain/habit/hooks/useHabitCreate';
import { useHabitUpdate } from '@/domain/habit/hooks/useHabitUpdate';
import { useHabitDelete } from '@/domain/habit/hooks/useHabitDelete';
import { HabitForm } from '@/domain/habit/components/HabitForm';
import { HabitList } from '@/domain/habit/components/HabitList';
import type { Habit, CreateHabitDto, UpdateHabitDto, HabitStatus } from '@/domain/habit/types';

export const HabitsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [filterStatus, setFilterStatus] = useState<'todos' | HabitStatus>('todos');
  const [sortOrder, setSortOrder] = useState<string>('data_cadastro_desc');

  const { habits, isLoading, refetch } = useHabitList({
    filters: {
      usuario_id: 1,
      filtro_status: filterStatus,
      ordenacao: sortOrder as any,
    },
  });

  const { createHabit, isCreating } = useHabitCreate();
  const { updateHabit, isUpdating } = useHabitUpdate();
  const { deleteHabit, isDeleting } = useHabitDelete();

  const handleCreateClick = () => {
    setEditingHabit(null);
    setShowForm(true);
  };

  const handleEditClick = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleDeleteClick = async (habit: Habit) => {
    if (window.confirm(`Tem certeza que deseja excluir o hábito "${habit.nome_habito}"?`)) {
      try {
        await deleteHabit({ id: habit.id, usuario_id: 1 });
        refetch();
      } catch (error) {
        alert('Erro ao excluir hábito');
      }
    }
  };

  const handleFormSubmit = async (data: CreateHabitDto | UpdateHabitDto) => {
    try {
      if (editingHabit) {
        await updateHabit({ id: editingHabit.id, usuario_id: 1, data: data as UpdateHabitDto });
      } else {
        await createHabit({ ...data, usuario_id: 1 } as CreateHabitDto);
      }
      setShowForm(false);
      setEditingHabit(null);
      refetch();
    } catch (error) {
      alert('Erro ao salvar hábito');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingHabit(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Meus Hábitos</h1>
          {!showForm && (
            <button
              onClick={handleCreateClick}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Novo Hábito
            </button>
          )}
        </div>

        {!showForm && (
          <div className="flex gap-4 mb-6">
            <div>
              <label
                htmlFor="filter-status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filtrar por Status
              </label>
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="todos">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
                <option value="concluído">Concluídos</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">
                Ordenar por
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="nome_asc">Nome (A-Z)</option>
                <option value="nome_desc">Nome (Z-A)</option>
                <option value="data_inicio_asc">Data de Início (Antiga)</option>
                <option value="data_inicio_desc">Data de Início (Recente)</option>
                <option value="data_cadastro_asc">Data de Cadastro (Antiga)</option>
                <option value="data_cadastro_desc">Data de Cadastro (Recente)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {showForm ? (
        <HabitForm
          habit={editingHabit || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isSubmitting={isCreating || isUpdating}
        />
      ) : (
        <HabitList
          habits={habits || []}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          isLoading={isLoading || isDeleting}
        />
      )}
    </div>
  );
};

export default HabitsPage;
