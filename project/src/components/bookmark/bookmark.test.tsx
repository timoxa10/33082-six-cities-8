import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Bookmark from 'components/bookmark/bookmark';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
});

describe('Component: Bookmark', () => {
  const props = {
    width: 100,
    height: 100,
    isFavorite: true,
    id: 5,
    isPlaceCardBookmark: true,
  };

  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <Bookmark {...props} />
        </Provider>
      </Router>,
    );

    const button = getByTestId('bookmark-button');

    expect(button).toBeInTheDocument();
  });
});
