import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { rootReducer } from 'store/root-reducer';
import { createAPI } from 'services/api';
import { fetchOffersList, checkAuthAction } from 'store/api-actions';
import { requireAuthorizationAction } from 'store/action';
import { INITIAL_CITY } from 'config/initial-city';
import { UserStatus } from 'config/user-status';
import { redirect } from 'store/redirect';
import App from './components/app/app';
import browserHistory from 'browser-history/browser-history';
import 'components/spinner/spinner.css';
import 'components/offer-sorting-form/offer-sorting-form.css';
import 'components/review-page-form/page-form.css';

const api = createAPI(() =>
  store.dispatch(requireAuthorizationAction(UserStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersList(INITIAL_CITY.name));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
