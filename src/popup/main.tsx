import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App';

// Styles
import '@/styles/global.css';

// Database
import { applyDefaultSettings } from '@/db/db';

// Apply default settings before mounting
applyDefaultSettings().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
