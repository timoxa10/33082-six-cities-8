import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from 'store/reducer';
import { createAPI } from 'services/api';
import type { ThunkAppDispatch } from 'types/action';
import { fetchOffersList, checkAuthAction } from 'store/api-actions';
import { requireAuthorizationAction } from 'store/action';
import { UserStatus } from 'config/UserStatus';
import { composeWithDevTools } from 'redux-devtools-extension';
import { redirect } from 'store/redirect';
import App from './components/app/app';
import 'elements/spinner/spinner.css';
import 'components/offer-sorting-form/offer-sorting-form.css';

const api = createAPI(() =>
  store.dispatch(requireAuthorizationAction(UserStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
