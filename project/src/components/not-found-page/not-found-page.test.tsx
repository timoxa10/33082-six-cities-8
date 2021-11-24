import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundPage from 'components/not-found-page/not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render component', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NotFoundPage />
      </Router>,
    );

    const headerElement = getByText(/Page not found/i);
    const linkElement = getByText(/Go to main page/i);

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
