import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from 'types/state';

export enum ActionType {
  GetCurrentCity = 'city/getCurrentCity',
  GetListOfOffers = 'data/GetListOfOffers',
  UpdateOffersList = 'data/UpdateOffersList',
  GetCurrentOfferId = 'offer/GetCurrentOfferId',
  GetListOfCities = 'data/GetListOfCities',
  GetActiveSortType = 'page/GetActiveSortType',
  GetSelectedPoint = 'card/GetSelectedPoint',
  GetListOfReviews = 'data/GetListOfReviews',
  GetCurrentOfferByIdData = 'data/cardGetCurrentOfferByIdData',
  GetNearbyOffers = 'data/GetNearbyOffers',
  SetLogin = 'login/SetLogin',
  SetAvatarUrl = 'login/SetAvatarUrl',
  RequireAuthorization = 'login/RequireAuthorization',
  RequireLogout = 'login/RequireLogout',
  RedirectToRoute = 'redirect/RedirectToRoute',
  UpdateOffer = 'offers/UpdateOffer',
  GetListOfFavoriteCards = 'data/GetListOfFavoriteCards',
  GetOffersStatus = 'status/GetOffersStatus',
  GetOfferPageStatus = 'status/GetOfferPageStatus',
  GetFavoritesOffersStatus = 'status/GetFavoritesOffersStatus',
  GetSendedCommentStatus = 'status/GetSendedCommentStatus',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
