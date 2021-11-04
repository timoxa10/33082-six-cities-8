import type { CityCoordinates } from 'types/city-coordinates';
import type { OfferProps, OffersProps } from 'types/card-props';
import { ActionType } from 'types/action';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';

export const getCurrentCityAction = (payload: CityCoordinates) =>
  ({
    type: ActionType.GetCurrentCity,
    payload,
  } as const);

export const getListOfOffersAction = (payload: OffersProps) =>
  ({
    type: ActionType.GetListOfOffers,
    payload,
  } as const);

export const updateOffersListAction = (payload: OffersProps) =>
  ({
    type: ActionType.UpdateOffersList,
    payload,
  } as const);

export const getListOfCitiesAction = (payload: CityCoordinates[]) =>
  ({
    type: ActionType.GetListOfCities,
    payload,
  } as const);

export const getActiveSortTypeAction = (payload: string) =>
  ({
    type: ActionType.GetActiveSortType,
    payload,
  } as const);

export const setIsLoadingAction = (payload: boolean) =>
  ({
    type: ActionType.SetIsLoading,
    payload,
  } as const);

export const getCurrentOfferIdAction = (payload: number) =>
  ({
    type: ActionType.GetCurrentOfferId,
    payload,
  } as const);

export const getSelectedPointAction = (payload: LocationInfo) =>
  ({
    type: ActionType.GetSelectedPoint,
    payload,
  } as const);

export const getListOfReviewsAction = (payload: ReviewsProps) =>
  ({
    type: ActionType.GetListOfReviews,
    payload,
  } as const);

export const getCurrentOfferByIdDataAction = (payload: OfferProps) =>
  ({
    type: ActionType.GetCurrentOfferByIdData,
    payload,
  } as const);

export const getNearbyOffersAction = (payload: OffersProps) =>
  ({
    type: ActionType.GetNearbyOffers,
    payload,
  } as const);
