import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App';

// Styles
import '@/styles/global.css';

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
