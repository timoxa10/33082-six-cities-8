import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Logo from 'components/logo/logo';
import { NameSpace } from 'store/root-reducer';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: { city: 'Paris' },
});

describe('Component: Logo', () => {
  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByAltText } = render(
      <Router history={history}>
        <Provider store={store}>
          <Logo />
        </Provider>
      </Router>,
    );

    const linkElement = getByAltText('6 cities logo');

    expect(linkElement).toBeInTheDocument();
  });
});
