import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import MainPageEmpty from 'components/main-page-empty/main-page-empty';
import { NameSpace } from 'store/root-reducer';
import { AppRoute } from 'config/app-route';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
  [NameSpace.Auth]: { login: 'login' },
  [NameSpace.Data]: { city: 'Paris' },
});

const history = createMemoryHistory();
const mockApp = (
  <Provider store={store}>
    <Router history={history}>
      <MainPageEmpty city="Paris" />
    </Router>
  </Provider>
);

describe('Component: MainPageEmpty', () => {
  it('should render MainPageEmpty when data is empty', () => {
    history.push(AppRoute.Favorites);
    render(mockApp);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
