import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ReviewsListItem from 'components/reviews-list/reviews-list-item';
import { fakeReviews } from 'mocks/mocks';

describe('Component: ReviewsListItem', () => {
  it('should render component', () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={history}>
        <ReviewsListItem review={fakeReviews[0]} />
      </Router>,
    );

    const text = getByAltText('Reviews avatar');

    expect(text).toBeInTheDocument();
  });
});
