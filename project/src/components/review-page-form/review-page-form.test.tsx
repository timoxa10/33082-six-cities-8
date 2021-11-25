import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ReviewPageForm from 'components/review-page-form/review-page-form';
import { NameSpace } from 'store/root-reducer';
import { UserStatus } from 'config/user-status';
import { DataStatus } from 'config/data-status';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Auth]: { authorizationStatus: UserStatus.NoAuth },
  [NameSpace.Data]: { currentOfferId: 4 },
  [NameSpace.Data]: { activeSortType: 'Popular' },
  [NameSpace.Status]: { sendedCommentStatus: DataStatus.IsSending },
});

describe('Component: ReviewPageForm', () => {
  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <ReviewPageForm />
        </Provider>
      </Router>,
    );

    const form = getByTestId('reviews-form');

    expect(form).toBeInTheDocument();
  });
});
