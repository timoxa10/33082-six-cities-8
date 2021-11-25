import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import CitiesMap from 'components/cities-map/cities-map';
import { NameSpace } from 'store/root-reducer';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: { city: 'Paris' },
});

describe('Component: CitiesMap', () => {
  const props = {
    isHovered: true,
    useOffersByCityPoints: true,
  };

  it('should render component', () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <CitiesMap {...props} />
        </Provider>
      </Router>,
    );

    const map = getByTestId('cities-map');

    expect(map).toBeInTheDocument();
  });
});
