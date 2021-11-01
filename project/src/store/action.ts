import type { CityCoordinates } from 'types/city-coordinates';
import type { CardsProps } from 'types/card-props';
import { ActionType } from 'types/action';

export const getCurrentCityAction = (value: CityCoordinates) =>
  ({
    type: ActionType.GetCurrentCity,
    payload: value,
  } as const);

export const getListOfOffersAction = (offers: CardsProps) =>
  ({
    type: ActionType.GetListOfOffers,
    payload: offers,
  } as const);

export const updateOffersListAction = (offers: CardsProps) =>
  ({
    type: ActionType.UpdateOffersList,
    payload: offers,
  } as const);

export const getListOfCitiesAction = () =>
  ({
    type: ActionType.GetListOfCities,
  } as const);
