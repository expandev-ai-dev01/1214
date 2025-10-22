/**
 * @page HabitsPage
 * @summary Main page for habit management (list, create, edit, delete)
 * @domain habit
 * @type list-page
 * @category habit-management
 */

import { useState } from 'react';
import { HabitForm } from '@/domain/habit/components/HabitForm';
import { HabitList } from '@/domain/habit/components/HabitList';
import { useHabitList } from '@/domain/habit/hooks/useHabitList';
import { useHabitCreate } from '@/domain/habit/hooks/useHabitCreate';
import { useHabitUpdate } from '@/domain/habit/hooks/useHabitUpdate';
import { useHabitDelete } from '@/domain/habit/hooks/useHabitDelete';
import type { Habit, CreateHabitDto, UpdateHabitDto } from '@/domain/habit/types';
import type { HabitsPageProps } from './types';

export const HabitsPage = (props: HabitsPageProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  const { data: habits, isLoading, refetch } = useHabitList();
  const { create, isCreating } = useHabitCreate();
  const { update, isUpdating } = useHabitUpdate();
  const { remove, isDeleting } = useHabitDelete();

  const handleOpenForm = () => {
    setEditingHabit(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingHabit(undefined);
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: CreateHabitDto | UpdateHabitDto) => {
    try {
      if (editingHabit) {
        await update(editingHabit.id, data as UpdateHabitDto);
      } else {
        await create(data as CreateHabitDto);
      }
      handleCloseForm();
      refetch();
    } catch (error) {
      console.error('Error saving habit:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
      refetch();
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Hábitos</h1>
              <p className="mt-2 text-sm text-gray-600">
                Gerencie seus hábitos e acompanhe seu progresso
              </p>
            </div>
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Novo Hábito
            </button>
          </div>
        </div>

        {isFormOpen && (
          <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingHabit ? 'Editar Hábito' : 'Novo Hábito'}
            </h2>
            <HabitForm
              habit={editingHabit}
              onSubmit={handleSubmit}
              onCancel={handleCloseForm}
              isSubmitting={isCreating || isUpdating}
            />
          </div>
        )}

        <HabitList
          habits={habits || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading || isDeleting}
        />
      </div>
    </div>
  );
};

export default HabitsPage;
