import { useNavigate } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary 404 error page
 * @description Displayed when user navigates to non-existent route
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Voltar para Home
      </button>
    </div>
  );
};

export default NotFoundPage;
