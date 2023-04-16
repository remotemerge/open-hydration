import * as React from 'react';
import { createRoot } from 'react-dom/client';

// components
import Option from './components/Option';

// styles
import '../styles/global.scss';

// render the application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Option />
  </React.StrictMode>,
);
