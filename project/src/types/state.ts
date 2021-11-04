import type { OfferProps, OffersProps } from 'types/card-props';
import type { CityCoordinates } from 'types/city-coordinates';
import type { LocationInfo } from 'types/location-info';
import type { ReviewsProps } from 'types/review-props';

export type State = {
  city: CityCoordinates;
  offers: OffersProps;
  offersByCity: OffersProps;
  activeSortType: string;
  locationsList: CityCoordinates[];
  isLoading: boolean;
  currentOfferId: number;
  selectedPoint: LocationInfo | null;
  reviewsList: ReviewsProps;
  offerByIdData: OfferProps | null;
  nearbyOffers: OffersProps;
};
