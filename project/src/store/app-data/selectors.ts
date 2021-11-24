import { NameSpace } from 'store/root-reducer';
import { State } from 'types/state';
import type { CityCoordinates } from 'types/city-coordinates';
import type { OfferProps, OffersProps } from 'types/card-props';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';

export const getCity = (state: State): CityCoordinates =>
  state[NameSpace.Data].city;

export const getOffersByCity = (state: State): OffersProps =>
  state[NameSpace.Data].offersByCity;

export const getOffers = (state: State): OffersProps =>
  state[NameSpace.Data].offers;

export const getSelectedPoint = (state: State): LocationInfo | null =>
  state[NameSpace.Data].selectedPoint;

export const getNearbyOffers = (state: State): OffersProps =>
  state[NameSpace.Data].nearbyOffers;

export const getCurrentOfferId = (state: State): number =>
  state[NameSpace.Data].currentOfferId;

export const getActiveSortType = (state: State): string =>
  state[NameSpace.Data].activeSortType;

export const getLocationsList = (state: State): CityCoordinates[] =>
  state[NameSpace.Data].locationsList;

export const getReviewsList = (state: State): ReviewsProps =>
  state[NameSpace.Data].reviewsList;

export const getOfferByIdData = (state: State): Partial<OfferProps> =>
  state[NameSpace.Data].offerByIdData;

export const getFavoriteCardsList = (state: State): OffersProps =>
  state[NameSpace.Data].favoriteCardsList;
