/**
 * @component HabitForm
 * @summary Form component for creating and editing habits
 * @domain habit
 * @type domain-component
 * @category form
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { HabitFormProps } from './types';
import type { FrequencyType, WeekDay } from '../../types';

const weekDays: WeekDay[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
const weekDayLabels: Record<WeekDay, string> = {
  segunda: 'Segunda',
  terca: 'Terça',
  quarta: 'Quarta',
  quinta: 'Quinta',
  sexta: 'Sexta',
  sabado: 'Sábado',
  domingo: 'Domingo',
};

const habitFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'O nome do hábito é obrigatório')
      .max(50, 'O nome do hábito deve ter no máximo 50 caracteres'),
    description: z
      .string()
      .max(200, 'A descrição deve ter no máximo 200 caracteres')
      .optional()
      .nullable(),
    frequencyType: z.enum(['diaria', 'semanal', 'mensal']),
    weekDays: z
      .array(z.enum(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']))
      .optional()
      .nullable(),
    monthDays: z.array(z.number().int().min(1).max(31)).optional().nullable(),
    scheduledTime: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'O horário deve estar no formato HH:MM')
      .optional()
      .nullable(),
    estimatedMinutes: z
      .number()
      .int()
      .min(1, 'O tempo estimado deve ser de pelo menos 1 minuto')
      .max(1440, 'O tempo estimado não pode ultrapassar 24 horas')
      .optional()
      .nullable(),
    startDate: z.string().min(1, 'A data de início é obrigatória'),
    idCategory: z.number().int().optional().nullable(),
    status: z.enum(['ativo', 'inativo', 'concluido']).optional(),
  })
  .refine(
    (data) => {
      if (data.frequencyType === 'diaria' || data.frequencyType === 'semanal') {
        return data.weekDays && data.weekDays.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia da semana',
      path: ['weekDays'],
    }
  )
  .refine(
    (data) => {
      if (data.frequencyType === 'mensal') {
        return data.monthDays && data.monthDays.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia do mês',
      path: ['monthDays'],
    }
  );

type HabitFormData = z.infer<typeof habitFormSchema>;

export const HabitForm = ({ habit, onSubmit, onCancel, isSubmitting = false }: HabitFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habit
      ? {
          name: habit.name,
          description: habit.description,
          frequencyType: habit.frequencyType,
          weekDays: habit.weekDays,
          monthDays: habit.monthDays,
          scheduledTime: habit.scheduledTime,
          estimatedMinutes: habit.estimatedMinutes,
          startDate: habit.startDate,
          idCategory: habit.idCategory,
          status: habit.status,
        }
      : {
          name: '',
          description: '',
          frequencyType: 'diaria',
          weekDays: [],
          monthDays: [],
          scheduledTime: '',
          estimatedMinutes: undefined,
          startDate: new Date().toISOString().split('T')[0],
          idCategory: undefined,
          status: 'ativo',
        },
  });

  const frequencyType = watch('frequencyType');
  const selectedWeekDays = watch('weekDays') || [];
  const selectedMonthDays = watch('monthDays') || [];

  const handleWeekDayToggle = (day: WeekDay) => {
    const current = selectedWeekDays;
    const updated = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
    setValue('weekDays', updated);
  };

  const handleMonthDayToggle = (day: number) => {
    const current = selectedMonthDays;
    const updated = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
    setValue('monthDays', updated);
  };

  const onFormSubmit = async (data: HabitFormData) => {
    await onSubmit(data as any);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome do Hábito *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="frequencyType" className="block text-sm font-medium text-gray-700">
          Frequência *
        </label>
        <select
          id="frequencyType"
          {...register('frequencyType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="diaria">Diária</option>
          <option value="semanal">Semanal</option>
          <option value="mensal">Mensal</option>
        </select>
        {errors.frequencyType && (
          <p className="mt-1 text-sm text-red-600">{errors.frequencyType.message}</p>
        )}
      </div>

      {(frequencyType === 'diaria' || frequencyType === 'semanal') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dias da Semana *</label>
          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleWeekDayToggle(day)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedWeekDays.includes(day)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {weekDayLabels[day]}
              </button>
            ))}
          </div>
          {errors.weekDays && (
            <p className="mt-1 text-sm text-red-600">{errors.weekDays.message}</p>
          )}
        </div>
      )}

      {frequencyType === 'mensal' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dias do Mês *</label>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleMonthDayToggle(day)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedMonthDays.includes(day)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          {errors.monthDays && (
            <p className="mt-1 text-sm text-red-600">{errors.monthDays.message}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700">
            Horário Ideal
          </label>
          <input
            id="scheduledTime"
            type="time"
            {...register('scheduledTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.scheduledTime && (
            <p className="mt-1 text-sm text-red-600">{errors.scheduledTime.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="estimatedMinutes" className="block text-sm font-medium text-gray-700">
            Tempo Estimado (minutos)
          </label>
          <input
            id="estimatedMinutes"
            type="number"
            {...register('estimatedMinutes', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.estimatedMinutes && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedMinutes.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Data de Início *
        </label>
        <input
          id="startDate"
          type="date"
          {...register('startDate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
        )}
      </div>

      {habit && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : habit ? 'Atualizar' : 'Criar Hábito'}
        </button>
      </div>
    </form>
  );
};
