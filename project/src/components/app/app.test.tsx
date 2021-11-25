import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
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

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('App Routing', () => {
  it('should render MainPage when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render 404 page when user opens incorrect route', () => {
    history.push('/incorrect-route');
    render(fakeApp);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
