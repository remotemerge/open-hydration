import * as React from 'react';
import * as ReactDOM from 'react-dom';

// components
import Popup from './components/Popup';

// styles
import '../styles/global.scss';

// render the application
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);
