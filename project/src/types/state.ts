import type { OfferProps, OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';
import { UserStatus } from 'config/UserStatus';
import { RootState } from 'store/root-reducer';

export type AppData = {
  city: CityCoordinates;
  offers: OffersProps;
  offersByCity: OffersProps;
  activeSortType: string;
  locationsList: CityCoordinates[];
  isLoading: boolean;
  isError: boolean;
  currentOfferId: number;
  selectedPoint: LocationInfo | null;
  reviewsList: ReviewsProps;
  offerByIdData: Partial<OfferProps>;
  nearbyOffers: OffersProps;
};

export type AppAuth = {
  authorizationStatus: UserStatus;
  login: string;
  avatarUrl: string;
};

export type State = RootState;
