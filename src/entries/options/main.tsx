import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App';

// Styles
import '@/src/styles/global.css';

// Database
import { applyDefaultSettings } from '@/src/db/db';

// Apply default settings before mounting
applyDefaultSettings().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
