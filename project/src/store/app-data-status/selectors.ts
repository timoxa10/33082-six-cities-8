import { NameSpace } from 'store/root-reducer';
import { State } from 'types/state';
import { DataStatus } from 'config/data-status';

export const getOffersStatus = (state: State): DataStatus =>
  state[NameSpace.Status].offersStatus;

export const getOfferPageStatus = (state: State): DataStatus =>
  state[NameSpace.Status].offerPageStatus;

export const getFavoritesOffersStatus = (state: State): DataStatus =>
  state[NameSpace.Status].favoritesOffersStatus;

export const getSendedCommentStatus = (state: State): DataStatus =>
  state[NameSpace.Status].sendedCommentStatus;
