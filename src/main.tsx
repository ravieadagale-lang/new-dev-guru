import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SuperAdminAuthProvider } from './services/auth/SuperAdminAuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SuperAdminAuthProvider>
      <App />
    </SuperAdminAuthProvider>
  </React.StrictMode>
);
