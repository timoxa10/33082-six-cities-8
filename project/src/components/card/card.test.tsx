import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Card from 'components/card/card';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';
import { fakeOffers } from 'mocks/mocks';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
});

describe('Component: Card', () => {
  const props = {
    card: fakeOffers[0],
    width: 100,
    height: 100,
  };

  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <Card {...props} />
        </Provider>
      </Router>,
    );

    const card = getByTestId('cities-card');

    expect(card).toBeInTheDocument();
  });
});
