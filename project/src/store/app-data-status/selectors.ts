import { NameSpace } from 'store/root-reducer';
import { State } from 'types/state';
import { DataStatus } from 'config/data-status';

export const getOffersStatus = (state: State): DataStatus =>
  state[NameSpace.status].offersStatus;

export const getOfferPageStatus = (state: State): DataStatus =>
  state[NameSpace.status].offerPageStatus;

export const getFavoritesOffersStatus = (state: State): DataStatus =>
  state[NameSpace.status].favoritesOffersStatus;

export const getSendedCommentStatus = (state: State): DataStatus =>
  state[NameSpace.status].sendedCommentStatus;
