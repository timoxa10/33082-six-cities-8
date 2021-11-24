import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Layout from 'components/layout/layout';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
  [NameSpace.Data]: { city: 'Paris' },
});

describe('Component: Layout', () => {
  const props = {
    children: [],
    shouldRenderFooter: false,
    shouldRenderHeader: true,
  };

  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <Layout {...props} />
        </Provider>
      </Router>,
    );

    const button = getByTestId('layout');

    expect(button).toBeInTheDocument();
  });
});
