import * as React from 'react';
import * as ReactDOM from 'react-dom';

// components
import Option from './components/Option';
// styles
import '../styles/global.scss';

// render the application
ReactDOM.render(
  <React.StrictMode>
    <Option />
  </React.StrictMode>,
  document.getElementById('root'),
);
