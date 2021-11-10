import { INITIAL_CITY } from 'config/InitialCity';
import { DEFAULT_SORT_TYPE } from 'config/DefaultSortType';
import { AppData } from 'types/state';

export const initialStateAppData: AppData = {
  city: INITIAL_CITY,
  offers: [],
  offersByCity: [],
  activeSortType: DEFAULT_SORT_TYPE,
  locationsList: [],
  isLoading: true,
  isError: false,
  currentOfferId: 0,
  selectedPoint: null,
  reviewsList: [],
  offerByIdData: {},
  nearbyOffers: [],
};
