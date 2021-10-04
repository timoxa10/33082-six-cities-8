import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  AVAILABLE_OFFERS: 3,
};

ReactDOM.render(
  <React.StrictMode>
    <App availableApartments={Setting.AVAILABLE_OFFERS} />
  </React.StrictMode>,
  document.getElementById('root'),
);
