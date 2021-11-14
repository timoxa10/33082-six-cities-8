import type { OffersProps } from 'types/card-props';
import type { LocationInfo } from 'types/location-info';

const getPointsForMainPage = (offers: OffersProps): LocationInfo[] =>
  offers.map(({ location }) => location);

const getPointsForCardPage = (
  offers: OffersProps,
  selectedPoint: LocationInfo | null,
): LocationInfo[] => {
  if (!selectedPoint) {
    return offers.map(({ location }) => location);
  }

  return [...offers?.map(({ location }) => location), selectedPoint];
};

export { getPointsForMainPage, getPointsForCardPage };
