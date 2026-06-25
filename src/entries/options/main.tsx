import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Application
import App from './App';

// Styles
import '@/styles/global.css';

// Mount the options page application into the document.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
