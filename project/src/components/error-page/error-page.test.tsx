import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ErrorPage from 'components/error-page/error-page';

describe('Component: ErrorPage', () => {
  it('should render component', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ErrorPage />
      </Router>,
    );

    const headerElement = getByText(/Something went wrong./i);
    const linkElement = getByText(/Please try to reload the page./i);

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
