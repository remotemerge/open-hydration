import * as React from 'react';
import { createRoot } from 'react-dom/client';

// components
import Popup from './components/Popup';

// styles
import '../styles/global.scss';

// render the application
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
