import { INITIAL_CITY } from 'config/initial-city';
import { DEFAULT_SORT_TYPE } from 'config/default-sort-type';
import { UserStatus } from 'config/user-status';
import { INITIAL_LOGIN } from 'config/initial-login';
import { INITIAL_AVATAR_URL } from 'config/initial-avatar-url';

export const initialState = {
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
  authorizationStatus: UserStatus.Unknown,
  login: INITIAL_LOGIN,
  avatarUrl: INITIAL_AVATAR_URL,
};
