import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// components
import App from './App';

// styles
import '@/styles/global.css';

// db
import { ensureSettings } from '@/db/db';

// initialize database then render the application
ensureSettings().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
