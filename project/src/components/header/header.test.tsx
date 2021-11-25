import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Header from 'components/header/header';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
  [NameSpace.Auth]: { login: 'dima@mail.ru' },
  [NameSpace.Auth]: { avatarUrl: 'image.png' },
  [NameSpace.Data]: { city: 'Paris' },
});

describe('Component: Header', () => {
  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>,
    );

    const card = getByTestId('header');

    expect(card).toBeInTheDocument();
  });
});
