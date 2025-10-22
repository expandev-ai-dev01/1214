/**
 * @entry main
 * @summary Application entry point
 * @type entry-point
 * @category core
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
