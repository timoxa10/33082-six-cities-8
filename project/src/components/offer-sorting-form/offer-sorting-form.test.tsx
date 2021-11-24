import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import OfferSortingForm from 'components/offer-sorting-form/offer-sorting-form';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
  [NameSpace.Data]: { activeSortType: 'Popular' },
  [NameSpace.Data]: { locationsList: [] },
});

describe('Component: OfferSortingForm', () => {
  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <OfferSortingForm />
        </Provider>
      </Router>,
    );

    const form = getByTestId('places-sorting-form');

    expect(form).toBeInTheDocument();
  });
});
