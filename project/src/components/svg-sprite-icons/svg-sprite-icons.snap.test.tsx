import { render } from '@testing-library/react';
import SvgSpriteIcons from 'components/svg-sprite-icons/svg-sprite-icons';

describe('Component: SvgSpriteIcons', () => {
  test('should render correctly Pin', () => {
    const { container } = render(<SvgSpriteIcons />);
    expect(container).toMatchSnapshot();
  });
});
