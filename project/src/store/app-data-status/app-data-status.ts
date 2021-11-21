import { createReducer } from '@reduxjs/toolkit';
import { getOffersStatusAction, getOfferPageStatusAction } from 'store/action';
import { getFavoritesOffersStatusAction } from 'store/action';
import { getSendedCommentStatusAction } from 'store/action';
import { initialStateAppDataStatus } from 'store/app-data-status/initial-state';

const appDataStatus = createReducer(initialStateAppDataStatus, (builder) => {
  builder
    .addCase(getOffersStatusAction, (state, action) => {
      state.offersStatus = action.payload;
    })
    .addCase(getOfferPageStatusAction, (state, action) => {
      state.offerPageStatus = action.payload;
    })
    .addCase(getFavoritesOffersStatusAction, (state, action) => {
      state.favoritesOffersStatus = action.payload;
    })
    .addCase(getSendedCommentStatusAction, (state, action) => {
      state.sendedCommentStatus = action.payload;
    });
});

export { appDataStatus };
