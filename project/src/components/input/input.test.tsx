import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Input from 'components/input/input';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
});

describe('Component: Input', () => {
  const props = {
    id: 10,
    value: 10,
    checked: true,
    onChange: () => null,
  };

  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <Input {...props} />
        </Provider>
      </Router>,
    );

    const button = getByTestId('rating');

    expect(button).toBeInTheDocument();
  });
});
