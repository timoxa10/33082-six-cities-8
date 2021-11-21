import type { OffersProps } from 'types/card-props';
import type { ReviewsProps } from 'types/review-props';
import { SortTypes } from 'config/sort-types';

const filterOffersList = (city: string, offers: OffersProps): OffersProps =>
  offers.filter((offer) => offer.city.name === city);

const filterReviewsList = (reviews: ReviewsProps): ReviewsProps =>
  reviews
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .slice(0, 10);

const sortOffersByType = (type: string, offers: OffersProps): OffersProps => {
  const fetchedOffers = offers.slice();
  switch (type) {
    case SortTypes.Popular:
      return fetchedOffers.sort((a, b) => a.id - b.id);
    case SortTypes.AscendingOrder:
      return fetchedOffers.sort((a, b) => a.price - b.price);
    case SortTypes.DescendingOrder:
      return fetchedOffers.sort((a, b) => b.price - a.price);
    case SortTypes.TopRated:
      return fetchedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return fetchedOffers;
  }
};

export { filterOffersList, sortOffersByType, filterReviewsList };
