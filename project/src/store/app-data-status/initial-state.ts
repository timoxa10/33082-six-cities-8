import { AppDataStatus } from 'types/state';
import { DataStatus } from 'config/DataStatus';

export const initialStateAppDataStatus: AppDataStatus = {
  offersStatus: DataStatus.Unknown,
  offerPageStatus: DataStatus.Unknown,
  favoritesOffersStatus: DataStatus.Unknown,
  sendedCommentStatus: DataStatus.Unknown,
};
