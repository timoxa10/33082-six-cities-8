import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import FavoritesPageEmpty from 'components/favorites-page-empty/favorites-page-empty';
import { NameSpace } from 'store/root-reducer';
import { AppRoute } from 'config/app-route';
import { DataStatus } from 'config/data-status';
import { UserStatus } from 'config/user-status';
import { fakeOffers } from 'mocks/mocks';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Status]: { favoritesOffersStatus: DataStatus.IsEmpty },
  [NameSpace.Auth]: { authorizationStatus: UserStatus.Auth },
  [NameSpace.Data]: { favoriteCardsList: fakeOffers },
});

const history = createMemoryHistory();
const mockApp = (
  <Provider store={store}>
    <Router history={history}>
      <FavoritesPageEmpty />
    </Router>
  </Provider>
);

describe('Component: FavoritesPageEmpty', () => {
  it('should render FavoritesPageEmpty when data is empty', () => {
    history.push(AppRoute.Favorites);
    render(mockApp);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
