import type { OfferProps, OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';
import { UserStatus } from 'config/UserStatus';
import { RootState } from 'store/root-reducer';
import { DataStatus } from 'config/DataStatus';

export type AppData = {
  city: CityCoordinates;
  offers: OffersProps;
  offersByCity: OffersProps;
  activeSortType: string;
  locationsList: CityCoordinates[];
  currentOfferId: number;
  selectedPoint: LocationInfo | null;
  reviewsList: ReviewsProps;
  offerByIdData: Partial<OfferProps>;
  nearbyOffers: OffersProps;
  favoriteCardsList: OffersProps;
};

export type AppDataStatus = {
  offersStatus: DataStatus;
  offerPageStatus: DataStatus;
  favoritesOffersStatus: DataStatus;
  sendedCommentStatus: DataStatus;
};

export type AppAuth = {
  authorizationStatus: UserStatus;
  login: string;
  avatarUrl: string;
};

export type State = RootState;
