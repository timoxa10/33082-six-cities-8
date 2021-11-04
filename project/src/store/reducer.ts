import { ActionType, Actions } from 'types/action';
import type { State } from 'types/state';
import { initialState } from 'store/initial-state';

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
        locationsList: action.payload,
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
    case ActionType.GetCurrentOfferId:
      return {
        ...state,
        currentOfferId: action.payload,
      };
    case ActionType.GetSelectedPoint:
      return {
        ...state,
        selectedPoint: action.payload,
      };
    case ActionType.GetListOfReviews:
      return {
        ...state,
        reviewsList: action.payload,
      };
    case ActionType.GetCurrentOfferByIdData:
      return {
        ...state,
        offerByIdData: action.payload,
      };
    case ActionType.GetNearbyOffers:
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
