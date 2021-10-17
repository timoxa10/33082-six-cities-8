import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import cardList from 'fixture/offers';

const Setting = {
  AVAILABLE_OFFERS: 3,
};

ReactDOM.render(
  <React.StrictMode>
    <App availableApartments={Setting.AVAILABLE_OFFERS} cardList={cardList} />
  </React.StrictMode>,
  document.getElementById('root'),
);
