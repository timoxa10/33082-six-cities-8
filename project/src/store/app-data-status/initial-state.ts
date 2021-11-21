import { AppDataStatus } from 'types/state';
import { DataStatus } from 'config/data-status';

export const initialStateAppDataStatus: AppDataStatus = {
  offersStatus: DataStatus.Unknown,
  offerPageStatus: DataStatus.Unknown,
  favoritesOffersStatus: DataStatus.Unknown,
  sendedCommentStatus: DataStatus.Unknown,
};
