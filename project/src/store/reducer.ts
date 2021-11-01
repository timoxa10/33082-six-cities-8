/* eslint-disable comma-dangle */
import { ActionType, Actions } from 'types/action';
import type { State } from 'types/state';
import {
  INITIAL_CITY,
  LOCATIONS_LIST,
  DEFAULT_SORT_TYPE,
} from 'config/constants';

const initialState = {
  city: INITIAL_CITY,
  offers: [],
  offersByCity: [],
  activeSortType: DEFAULT_SORT_TYPE,
  locationsList: LOCATIONS_LIST,
  isLoading: true,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GetCurrentCity:
      return { ...state, city: action.payload };
    case ActionType.GetListOfOffers:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.UpdateOffersList:
      return {
        ...state,
        offersByCity: action.payload,
      };
    case ActionType.GetListOfCities:
      return {
        ...state,
        locationsList: LOCATIONS_LIST,
      };
    case ActionType.GetActiveSortType:
      return {
        ...state,
        activeSortType: action.payload,
      };
    case ActionType.SetIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
