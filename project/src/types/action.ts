import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from 'types/state';

export enum ActionType {
  GetCurrentCity = 'GetCurrentCity',
  GetListOfOffers = 'GetListOfOffers',
  GetListOfCities = 'GetListOfCities',
  UpdateOffersList = 'UpdateOffersList',
  GetActiveSortType = 'GetActiveSortType',
  SetIsLoading = 'SetIsLoading',
  SetIsError = 'SetIsError',
  GetCurrentOfferId = 'GetCurrentOfferId',
  GetSelectedPoint = 'GetSelectedPoint',
  GetListOfReviews = 'GetListOfReviews',
  GetCurrentOfferByIdData = 'GetCurrentOfferByIdData',
  GetNearbyOffers = 'GetNearbyOffers',
  SetLoginAction = 'SetLoginAction',
  SetAvatarUrl = 'SetAvatarUrl',
  RequireAuthorization = 'RequireAuthorization',
  RequireLogout = 'RequireLogout',
  RedirectToRoute = 'RedirectToRoute',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
