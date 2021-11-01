/* eslint-disable comma-dangle */
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {
  getCurrentCityAction,
  getListOfOffersAction,
  getListOfCitiesAction,
  updateOffersListAction,
} from 'store/action';
import { State } from 'types/state';

export enum ActionType {
  GetCurrentCity = 'GetCurrentCity',
  GetListOfOffers = 'GetListOfOffers',
  GetListOfCities = 'GetListOfCities',
  UpdateOffersList = 'UpdateOffersList',
}

export type Actions =
  | ReturnType<typeof getCurrentCityAction>
  | ReturnType<typeof getListOfOffersAction>
  | ReturnType<typeof getListOfCitiesAction>
  | ReturnType<typeof updateOffersListAction>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Actions
>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
