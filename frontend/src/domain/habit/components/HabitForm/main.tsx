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
import { FrequencyType, WeekDay } from '../../types';
import type { HabitFormProps, HabitFormData } from './types';
import {
  getHabitFormClassName,
  getFormFieldClassName,
  getFormLabelClassName,
  getFormInputClassName,
  getFormErrorClassName,
  getFormButtonGroupClassName,
  getFormButtonClassName,
} from './variants';

const habitFormSchema = z
  .object({
    nome_habito: z
      .string()
      .min(1, 'O nome do hábito é obrigatório')
      .max(50, 'O nome do hábito deve ter no máximo 50 caracteres')
      .refine((val) => val.trim().length > 0, {
        message: 'O nome do hábito não pode conter apenas espaços em branco',
      }),
    descricao: z.string().max(200, 'A descrição deve ter no máximo 200 caracteres').optional(),
    tipo_frequencia: z.nativeEnum(FrequencyType, {
      message: 'Selecione a frequência do hábito',
    }),
    dias_semana: z.array(z.nativeEnum(WeekDay)).optional(),
    dias_mes: z.array(z.number().int().min(1).max(31)).optional(),
    horario_realizacao: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'O horário deve estar no formato HH:MM')
      .optional()
      .or(z.literal('')),
    tempo_estimado: z
      .number()
      .int()
      .min(1, 'O tempo estimado deve ser de pelo menos 1 minuto')
      .max(1440, 'O tempo estimado não pode ultrapassar 24 horas')
      .optional(),
    data_inicio: z.string().min(1, 'A data de início é obrigatória'),
    categoria_id: z.number().int().positive().optional(),
  })
  .refine(
    (data) => {
      if (
        data.tipo_frequencia === FrequencyType.Daily ||
        data.tipo_frequencia === FrequencyType.Weekly
      ) {
        return data.dias_semana && data.dias_semana.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia da semana',
      path: ['dias_semana'],
    }
  )
  .refine(
    (data) => {
      if (data.tipo_frequencia === FrequencyType.Monthly) {
        return data.dias_mes && data.dias_mes.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia do mês',
      path: ['dias_mes'],
    }
  );

export const HabitForm = ({ habit, onSubmit, onCancel, isSubmitting = false }: HabitFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habit
      ? {
          nome_habito: habit.nome_habito,
          descricao: habit.descricao || '',
          tipo_frequencia: habit.tipo_frequencia,
          dias_semana: habit.dias_semana || [],
          dias_mes: habit.dias_mes || [],
          horario_realizacao: habit.horario_realizacao || '',
          tempo_estimado: habit.tempo_estimado || undefined,
          data_inicio: habit.data_inicio.split('T')[0],
          categoria_id: habit.categoria_id || undefined,
        }
      : {
          tipo_frequencia: FrequencyType.Daily,
          data_inicio: new Date().toISOString().split('T')[0],
        },
  });

  const tipoFrequencia = watch('tipo_frequencia');

  const handleFormSubmit = async (data: HabitFormData) => {
    const submitData: any = {
      nome_habito: data.nome_habito,
      descricao: data.descricao || null,
      tipo_frequencia: data.tipo_frequencia as FrequencyType,
      horario_realizacao: data.horario_realizacao || null,
      tempo_estimado: data.tempo_estimado || null,
      data_inicio: data.data_inicio,
      categoria_id: data.categoria_id || null,
    };

    if (
      data.tipo_frequencia === FrequencyType.Daily ||
      data.tipo_frequencia === FrequencyType.Weekly
    ) {
      submitData.dias_semana = data.dias_semana || [];
    }

    if (data.tipo_frequencia === FrequencyType.Monthly) {
      submitData.dias_mes = data.dias_mes || [];
    }

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={getHabitFormClassName({})}>
      <div className={getFormFieldClassName()}>
        <label htmlFor="nome_habito" className={getFormLabelClassName()}>
          Nome do Hábito *
        </label>
        <input
          id="nome_habito"
          type="text"
          {...register('nome_habito')}
          className={getFormInputClassName(!!errors.nome_habito)}
          disabled={isSubmitting}
        />
        {errors.nome_habito && (
          <p className={getFormErrorClassName()}>{errors.nome_habito.message}</p>
        )}
      </div>

      <div className={getFormFieldClassName()}>
        <label htmlFor="descricao" className={getFormLabelClassName()}>
          Descrição
        </label>
        <textarea
          id="descricao"
          rows={3}
          {...register('descricao')}
          className={getFormInputClassName(!!errors.descricao)}
          disabled={isSubmitting}
        />
        {errors.descricao && <p className={getFormErrorClassName()}>{errors.descricao.message}</p>}
      </div>

      <div className={getFormFieldClassName()}>
        <label htmlFor="tipo_frequencia" className={getFormLabelClassName()}>
          Frequência *
        </label>
        <select
          id="tipo_frequencia"
          {...register('tipo_frequencia')}
          className={getFormInputClassName(!!errors.tipo_frequencia)}
          disabled={isSubmitting}
        >
          <option value={FrequencyType.Daily}>Diária</option>
          <option value={FrequencyType.Weekly}>Semanal</option>
          <option value={FrequencyType.Monthly}>Mensal</option>
        </select>
        {errors.tipo_frequencia && (
          <p className={getFormErrorClassName()}>{errors.tipo_frequencia.message}</p>
        )}
      </div>

      {(tipoFrequencia === FrequencyType.Daily || tipoFrequencia === FrequencyType.Weekly) && (
        <div className={getFormFieldClassName()}>
          <label className={getFormLabelClassName()}>Dias da Semana *</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(WeekDay).map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={day}
                  {...register('dias_semana')}
                  disabled={isSubmitting}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 capitalize">{day}</span>
              </label>
            ))}
          </div>
          {errors.dias_semana && (
            <p className={getFormErrorClassName()}>{errors.dias_semana.message}</p>
          )}
        </div>
      )}

      {tipoFrequencia === FrequencyType.Monthly && (
        <div className={getFormFieldClassName()}>
          <label className={getFormLabelClassName()}>Dias do Mês *</label>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <label key={day} className="flex items-center justify-center">
                <input
                  type="checkbox"
                  value={day}
                  {...register('dias_mes', {
                    setValueAs: (v) => (v ? v.map(Number) : []),
                  })}
                  disabled={isSubmitting}
                  className="sr-only peer"
                />
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-sm peer-checked:bg-primary-600 peer-checked:text-white peer-checked:border-primary-600 cursor-pointer">
                  {day}
                </span>
              </label>
            ))}
          </div>
          {errors.dias_mes && <p className={getFormErrorClassName()}>{errors.dias_mes.message}</p>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className={getFormFieldClassName()}>
          <label htmlFor="horario_realizacao" className={getFormLabelClassName()}>
            Horário Ideal
          </label>
          <input
            id="horario_realizacao"
            type="time"
            {...register('horario_realizacao')}
            className={getFormInputClassName(!!errors.horario_realizacao)}
            disabled={isSubmitting}
          />
          {errors.horario_realizacao && (
            <p className={getFormErrorClassName()}>{errors.horario_realizacao.message}</p>
          )}
        </div>

        <div className={getFormFieldClassName()}>
          <label htmlFor="tempo_estimado" className={getFormLabelClassName()}>
            Tempo Estimado (minutos)
          </label>
          <input
            id="tempo_estimado"
            type="number"
            min="1"
            max="1440"
            {...register('tempo_estimado', { valueAsNumber: true })}
            className={getFormInputClassName(!!errors.tempo_estimado)}
            disabled={isSubmitting}
          />
          {errors.tempo_estimado && (
            <p className={getFormErrorClassName()}>{errors.tempo_estimado.message}</p>
          )}
        </div>
      </div>

      <div className={getFormFieldClassName()}>
        <label htmlFor="data_inicio" className={getFormLabelClassName()}>
          Data de Início *
        </label>
        <input
          id="data_inicio"
          type="date"
          {...register('data_inicio')}
          className={getFormInputClassName(!!errors.data_inicio)}
          disabled={isSubmitting}
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.data_inicio && (
          <p className={getFormErrorClassName()}>{errors.data_inicio.message}</p>
        )}
      </div>

      <div className={getFormButtonGroupClassName()}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={getFormButtonClassName('secondary')}
        >
          Cancelar
        </button>
        <button type="submit" disabled={isSubmitting} className={getFormButtonClassName('primary')}>
          {isSubmitting ? 'Salvando...' : habit ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
};
