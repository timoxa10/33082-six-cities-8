import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Spinner from 'components/spinner/spinner';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
});

describe('Component: Spinner', () => {
  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <Spinner />
        </Provider>
      </Router>,
    );

    const button = getByTestId('spinner');

    expect(button).toBeInTheDocument();
  });
});
