import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary Root layout component for the application
 * @description Provides the base structure for all pages
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
