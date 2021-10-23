import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import cardList from 'fixture/offers';
import reviewList from 'fixture/reviews';

const Setting = {
  AVAILABLE_OFFERS: 3,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      availableApartments={Setting.AVAILABLE_OFFERS}
      cardList={cardList}
      reviewList={reviewList}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
