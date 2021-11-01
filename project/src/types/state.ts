import type { CardsProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';

export type State = {
  city: CityCoordinates;
  offers: CardsProps;
  offersByCity: CardsProps;
  locationsList: CityCoordinates[];
};
