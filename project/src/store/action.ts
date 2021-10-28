/* eslint-disable comma-dangle */
import type { CityCoordinates } from 'types/city-coordinates';

import {
  ActionType,
  GetCurrentCityAction,
  GetCurrentCityCoordsAction,
  GetListOfOffersAction,
} from 'types/action';

export const getCurrentCity = (value: string): GetCurrentCityAction => ({
  type: ActionType.GetCurrentCity,
  payload: value,
});

export const getCurrentCityCoords = (
  value: CityCoordinates,
): GetCurrentCityCoordsAction => ({
  type: ActionType.GetCurrentCityCoords,
  payload: value,
});

export const getListOfOffersAction = (): GetListOfOffersAction => ({
  type: ActionType.GetListOfOffers,
});
