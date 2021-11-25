import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ReviewsList from 'components/reviews-list/reviews-list';
import { fakeReviews } from 'mocks/mocks';

describe('Component: ReviewsList', () => {
  it('should render component', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ReviewsList reviews={fakeReviews} />
      </Router>,
    );

    const text = getByText(/Reviews./i);

    expect(text).toBeInTheDocument();
  });
});
