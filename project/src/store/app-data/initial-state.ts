import { INITIAL_CITY } from 'config/initial-city';
import { DEFAULT_SORT_TYPE } from 'config/default-sort-type';
import { AppData } from 'types/state';

export const initialStateAppData: AppData = {
  city: INITIAL_CITY,
  offers: [],
  offersByCity: [],
  activeSortType: DEFAULT_SORT_TYPE,
  locationsList: [],
  currentOfferId: 0,
  selectedPoint: null,
  reviewsList: [],
  offerByIdData: {},
  nearbyOffers: [],
  favoriteCardsList: [],
};
