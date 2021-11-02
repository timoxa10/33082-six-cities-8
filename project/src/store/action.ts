import type { CityCoordinates } from 'types/city-coordinates';
import type { OffersProps } from 'types/card-props';
import { ActionType } from 'types/action';

export const getCurrentCityAction = (value: CityCoordinates) =>
  ({
    type: ActionType.GetCurrentCity,
    payload: value,
  } as const);

export const getListOfOffersAction = (offers: OffersProps) =>
  ({
    type: ActionType.GetListOfOffers,
    payload: offers,
  } as const);

export const updateOffersListAction = (offers: OffersProps) =>
  ({
    type: ActionType.UpdateOffersList,
    payload: offers,
  } as const);

export const getListOfCitiesAction = () =>
  ({
    type: ActionType.GetListOfCities,
  } as const);

export const getActiveSortTypeAction = (value: string) =>
  ({
    type: ActionType.GetActiveSortType,
    payload: value,
  } as const);

export const setIsLoadingAction = (value: boolean) =>
  ({
    type: ActionType.SetIsLoading,
    payload: value,
  } as const);
