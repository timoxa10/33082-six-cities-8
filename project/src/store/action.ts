import { createAction } from '@reduxjs/toolkit';
import type { CityCoordinates } from 'types/city-coordinates';
import type { OfferProps, OffersProps } from 'types/card-props';
import { ActionType } from 'types/action';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';
import { UserStatus } from 'config/UserStatus';
import { AppRoute } from 'config/AppRoute';

export const getCurrentCityAction = createAction(
  ActionType.GetCurrentCity,
  (payload: CityCoordinates) => ({
    payload,
  }),
);

export const getListOfOffersAction = createAction(
  ActionType.GetListOfOffers,
  (payload: OffersProps) => ({
    payload,
  }),
);

export const updateOffersListAction = createAction(
  ActionType.UpdateOffersList,
  (payload: OffersProps) => ({
    payload,
  }),
);

export const getListOfCitiesAction = createAction(
  ActionType.GetListOfCities,
  (payload: CityCoordinates[]) => ({
    payload,
  }),
);

export const getActiveSortTypeAction = createAction(
  ActionType.GetActiveSortType,
  (payload: string) => ({
    payload,
  }),
);

export const setIsLoadingAction = createAction(
  ActionType.SetIsLoading,
  (payload: boolean) => ({
    payload,
  }),
);

export const setIsErrorAction = createAction(
  ActionType.SetIsError,
  (payload: boolean) => ({
    payload,
  }),
);

export const getCurrentOfferIdAction = createAction(
  ActionType.GetCurrentOfferId,
  (payload: number) => ({
    payload,
  }),
);

export const getSelectedPointAction = createAction(
  ActionType.GetSelectedPoint,
  (payload: LocationInfo) => ({
    payload,
  }),
);

export const getListOfReviewsAction = createAction(
  ActionType.GetListOfReviews,
  (payload: ReviewsProps) => ({
    payload,
  }),
);

export const getCurrentOfferByIdDataAction = createAction(
  ActionType.GetCurrentOfferByIdData,
  (payload: OfferProps) => ({
    payload,
  }),
);

export const getNearbyOffersAction = createAction(
  ActionType.GetNearbyOffers,
  (payload: OffersProps) => ({
    payload,
  }),
);

export const setLoginAction = createAction(
  ActionType.SetLoginAction,
  (payload: string) => ({
    payload,
  }),
);

export const setAvatarUrlAction = createAction(
  ActionType.SetAvatarUrl,
  (payload: string) => ({
    payload,
  }),
);

export const requireAuthorizationAction = createAction(
  ActionType.RequireAuthorization,
  (payload: UserStatus) => ({
    payload,
  }),
);

export const requireLogoutAction = createAction(ActionType.RequireLogout);

export const redirectToRouteAction = createAction(
  ActionType.RedirectToRoute,
  (payload: AppRoute) => ({
    payload,
  }),
);

export const updateOfferAction = createAction(
  ActionType.UpdateOffer,
  (payload: OfferProps) => ({
    payload,
  }),
);

export const getListOfFavoriteCardsAction = createAction(
  ActionType.GetListOfFavoriteCards,
  (payload: OffersProps) => ({
    payload,
  }),
);
