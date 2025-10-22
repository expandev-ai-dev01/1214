/**
 * @page HomePage
 * @summary Home page of the application
 * @description Welcome page for the habit tracker application
 */

import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Gerenciador de Hábitos</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        Sistema para registrar hábitos e marcar como concluídos. Organize sua rotina e acompanhe seu
        progresso.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate('/habits')}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Começar
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
          Saiba Mais
        </button>
      </div>
    </div>
  );
};

export default HomePage;
