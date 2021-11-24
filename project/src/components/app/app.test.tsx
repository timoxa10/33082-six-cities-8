import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import App from 'components/app/app';
import { NameSpace } from 'store/root-reducer';
import { AppRoute } from 'config/app-route';
import { DataStatus } from 'config/data-status';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: { currentOfferId: 15 },
  [NameSpace.Status]: { offersStatus: DataStatus.IsLoaded },
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
});

const history = createMemoryHistory();
const mockApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Component: App', () => {
  it('should render Main Page when user opens RootPage and data is Loaded', () => {
    history.push(AppRoute.Root);
    render(mockApp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });
});
