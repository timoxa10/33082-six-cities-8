import type { OfferProps, OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';
import { UserStatus } from 'config/UserStatus';

export type State = {
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
  authorizationStatus: UserStatus;
  login: string;
  avatarUrl: string;
};
