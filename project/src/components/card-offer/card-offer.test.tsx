import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import CardOffer from 'components/card-offer/card-offer';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';
import { DataStatus } from 'config/data-status';
import { fakeOffers, fakeReviews } from 'mocks/mocks';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
  [NameSpace.Status]: { offerPageStatus: DataStatus.IsLoaded },
  [NameSpace.Data]: { city: 'Paris' },
  [NameSpace.Data]: { offersByCity: fakeOffers },
});

describe('Component: CardOffer', () => {
  const props = {
    reviewsList: fakeReviews,
    offerByIdData: fakeOffers[0],
    nearbyOffers: fakeOffers,
    authorizationStatus: UserStatus.NoAuth,
    loadingStatus: DataStatus.IsLoaded,
  };

  it('should render component when data IsLoaded', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <CardOffer {...props} />
        </Provider>
      </Router>,
    );

    const card = getByTestId('offer-card');

    expect(card).toBeInTheDocument();
  });
});
