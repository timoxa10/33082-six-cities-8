import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from 'store/reducer';
import { createAPI } from 'services/api';
import type { ThunkAppDispatch } from 'types/action';
import { fetchOffersList } from 'store/api-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';

const api = createAPI();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

(store.dispatch as ThunkAppDispatch)(fetchOffersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
