import type { CityCoordinates } from 'types/city-coordinates';

export enum ActionType {
  GetCurrentCity = 'GetCurrentCity',
  GetCurrentCityCoords = 'GetCurrentCityCoords',
  GetListOfOffers = 'GetListOfOffers',
}

export type GetCurrentCityAction = {
  type: ActionType.GetCurrentCity;
  payload: string;
};

export type GetCurrentCityCoordsAction = {
  type: ActionType.GetCurrentCityCoords;
  payload: CityCoordinates;
};

export type GetListOfOffersAction = {
  type: ActionType.GetListOfOffers;
};

export type Actions =
  | GetCurrentCityAction
  | GetCurrentCityCoordsAction
  | GetListOfOffersAction;
