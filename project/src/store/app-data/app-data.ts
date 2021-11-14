/* eslint-disable comma-dangle */
import { createReducer } from '@reduxjs/toolkit';
import {
  getCurrentCityAction,
  getListOfOffersAction,
  updateOffersListAction,
  getListOfCitiesAction,
  getActiveSortTypeAction,
  getCurrentOfferIdAction,
  getSelectedPointAction,
  getListOfReviewsAction,
  getCurrentOfferByIdDataAction,
  getNearbyOffersAction,
  updateOfferAction,
  getListOfFavoriteCardsAction,
} from 'store/action';
import { initialStateAppData } from 'store/app-data/initial-state';

const appData = createReducer(initialStateAppData, (builder) => {
  builder
    .addCase(getCurrentCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getListOfOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(updateOffersListAction, (state, action) => {
      state.offersByCity = action.payload;
    })
    .addCase(getListOfCitiesAction, (state, action) => {
      state.locationsList = action.payload;
    })
    .addCase(getActiveSortTypeAction, (state, action) => {
      state.activeSortType = action.payload;
    })
    .addCase(getCurrentOfferIdAction, (state, action) => {
      state.currentOfferId = action.payload;
    })
    .addCase(getSelectedPointAction, (state, action) => {
      state.selectedPoint = action.payload;
    })
    .addCase(getListOfReviewsAction, (state, action) => {
      state.reviewsList = action.payload;
    })
    .addCase(getCurrentOfferByIdDataAction, (state, action) => {
      state.offerByIdData = action.payload;
    })
    .addCase(getNearbyOffersAction, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(updateOfferAction, (state, action) => {
      const offerToUpdate = state.offers.find(
        (offer) => offer.id === action.payload.id,
      );

      const offerIndex = state.offers.findIndex(
        (offer) => offer.id === action.payload.id,
      );

      if (offerToUpdate) {
        offerToUpdate.isFavorite = action.payload.isFavorite;
        state.offers = [
          ...state.offers.slice(0, offerIndex),
          offerToUpdate,
          ...state.offers.slice(offerIndex + 1),
        ];
      }
    })
    .addCase(getListOfFavoriteCardsAction, (state, action) => {
      state.favoriteCardsList = action.payload;
    });
});

export { appData };
