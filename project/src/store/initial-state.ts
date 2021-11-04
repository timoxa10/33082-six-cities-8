import { INITIAL_CITY } from 'config/initial-city';
import { DEFAULT_SORT_TYPE } from 'config/default-sort-type';

export const initialState = {
  city: INITIAL_CITY,
  offers: [],
  offersByCity: [],
  activeSortType: DEFAULT_SORT_TYPE,
  locationsList: [],
  isLoading: true,
  currentOfferId: 0,
  selectedPoint: null,
  reviewsList: [],
  offerByIdData: null,
  nearbyOffers: [],
};
