import { render } from '@testing-library/react';
import Pin from 'components/icons/pin';
import PinActive from 'components/icons/pin-active';

describe('Component: Pin & PinActive', () => {
  test('should render correctly Pin', () => {
    const { container } = render(<Pin />);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly PinActive', () => {
    const { container } = render(<PinActive />);
    expect(container).toMatchSnapshot();
  });
});
