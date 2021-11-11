import { NameSpace } from 'store/root-reducer';
import { State } from 'types/state';
import type { CityCoordinates } from 'types/city-coordinates';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';

export const getCity = (state: State): CityCoordinates =>
  state[NameSpace.data].city;

export const getOffersByCity = (state: State): OffersProps =>
  state[NameSpace.data].offersByCity;

export const getOffers = (state: State): OffersProps =>
  state[NameSpace.data].offers;

export const getSelectedPoint = (state: State): LocationInfo | null =>
  state[NameSpace.data].selectedPoint;

export const getNearbyOffers = (state: State): OffersProps =>
  state[NameSpace.data].nearbyOffers;

export const getIsLoading = (state: State): boolean =>
  state[NameSpace.data].isLoading;

export const getIsError = (state: State): boolean =>
  state[NameSpace.data].isError;

export const getCurrentOfferId = (state: State): number =>
  state[NameSpace.data].currentOfferId;

export const getActiveSortType = (state: State): string =>
  state[NameSpace.data].activeSortType;

export const getLocationsList = (state: State): CityCoordinates[] =>
  state[NameSpace.data].locationsList;

export const getReviewsList = (state: State): ReviewsProps =>
  state[NameSpace.data].reviewsList;

export const getOfferByIdData = (state: State): Partial<OfferProps> =>
  state[NameSpace.data].offerByIdData;

export const getFavoriteCardsList = (state: State): OffersProps =>
  state[NameSpace.data].favoriteCardsList;
