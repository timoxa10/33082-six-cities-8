import { ActionType, Actions } from 'types/action';
import type { State } from 'types/state';
import { INITIAL_CITY, LOCATION_LIST } from 'config/constants';

const initialState = {
  city: INITIAL_CITY,
  offers: [],
  offersByCity: [],
  locationsList: LOCATION_LIST,
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
        locationsList: LOCATION_LIST,
      };
    default:
      return state;
  }
};

export { reducer };
