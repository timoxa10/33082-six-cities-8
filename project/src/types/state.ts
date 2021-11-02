import type { OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';

export type State = {
  city: CityCoordinates;
  offers: OffersProps;
  offersByCity: OffersProps;
  activeSortType: string;
  locationsList: CityCoordinates[];
  isLoading: boolean;
};
