/* eslint-disable comma-dangle */
import { createReducer } from '@reduxjs/toolkit';
import {
  getCurrentCityAction,
  getListOfOffersAction,
  updateOffersListAction,
  getListOfCitiesAction,
  getActiveSortTypeAction,
  setIsLoadingAction,
  setIsErrorAction,
  getCurrentOfferIdAction,
  getSelectedPointAction,
  getListOfReviewsAction,
  getCurrentOfferByIdDataAction,
  getNearbyOffersAction,
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
    .addCase(setIsLoadingAction, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setIsErrorAction, (state, action) => {
      state.isError = action.payload;
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
    });
});

export { appData };
