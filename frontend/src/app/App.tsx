/**
 * @component App
 * @summary Root application component
 * @type root-component
 * @category core
 */

import { AppProviders } from './providers';
import { AppRouter } from './router';
import '@/assets/styles/globals.css';

export const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
