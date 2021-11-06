import { INITIAL_CITY } from 'config/InitialCity';
import { DEFAULT_SORT_TYPE } from 'config/DefaultSortType';
import { UserStatus } from 'config/UserStatus';
import { INITIAL_LOGIN } from 'config/InitialLogin';

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
  authorizationStatus: UserStatus.Unknown,
  login: INITIAL_LOGIN,
};
