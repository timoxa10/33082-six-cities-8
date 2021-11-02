/* eslint-disable comma-dangle */
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {
  getCurrentCityAction,
  getListOfOffersAction,
  getListOfCitiesAction,
  updateOffersListAction,
  getActiveSortTypeAction,
  setIsLoadingAction,
  getCurrentOfferIdAction,
  getSelectedPointAction,
} from 'store/action';
import { State } from 'types/state';

export enum ActionType {
  GetCurrentCity = 'GetCurrentCity',
  GetListOfOffers = 'GetListOfOffers',
  GetListOfCities = 'GetListOfCities',
  UpdateOffersList = 'UpdateOffersList',
  GetActiveSortType = 'GetActiveSortType',
  SetIsLoading = 'SetIsLoading',
  GetCurrentOfferId = 'GetCurrentOfferId',
  GetSelectedPoint = 'GetSelectedPoint',
}

export type Actions =
  | ReturnType<typeof getCurrentCityAction>
  | ReturnType<typeof getListOfOffersAction>
  | ReturnType<typeof getListOfCitiesAction>
  | ReturnType<typeof updateOffersListAction>
  | ReturnType<typeof getActiveSortTypeAction>
  | ReturnType<typeof setIsLoadingAction>
  | ReturnType<typeof getCurrentOfferIdAction>
  | ReturnType<typeof getSelectedPointAction>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Actions
>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
