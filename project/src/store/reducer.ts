import { ActionType, Actions } from 'types/action';
import type { State } from 'types/state';
import CardList from 'fixture/offers';

const initialState = {
  city: 'Paris',
  cityCoords: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  offers: CardList.filter((card) => card.city.name === 'Paris'),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.GetCurrentCity:
      return { ...state, city: action.payload };
    case ActionType.GetCurrentCityCoords:
      return { ...state, cityCoords: action.payload };
    case ActionType.GetListOfOffers:
      return {
        ...state,
        offers: CardList.filter((card) => card.city.name === state.city),
      };
    default:
      return state;
  }
};

export { reducer };
