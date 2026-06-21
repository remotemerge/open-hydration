import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// components
import App from './App';

// styles
import '@/styles/global.css';

// render the application
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
