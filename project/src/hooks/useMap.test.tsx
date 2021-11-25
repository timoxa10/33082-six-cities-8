import { renderHook } from '@testing-library/react-hooks';
import useMap from 'hooks/useMap';

describe('Hook: useMap', () => {
  it('should return map instance if correct ref was passed', () => {
    const ref = {
      current: document.createElement('section'),
    };

    const cityProps = {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    };

    const selectedPointProps = {
      latitude: 5,
      longitude: 5,
      zoom: 15,
    };

    const { result } = renderHook(() =>
      useMap(ref, cityProps, [], selectedPointProps, true),
    );

    expect(result.current).not.toBe(null);
  });
});
