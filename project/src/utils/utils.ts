import type { OffersProps } from 'types/card-props';
import { SortTypes } from 'config/SortTypes';

const capitalizeFirstLetter = (string = ''): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const filterOffersList = (city: string, offers: OffersProps): OffersProps =>
  offers.filter((offer) => offer.city.name === city);

const sortOffersByType = (type: string, offers: OffersProps): OffersProps => {
  switch (type) {
    case SortTypes.Popular:
      return offers.sort((a, b) => a.id - b.id);
    case SortTypes.AscendingOrder:
      return offers.sort((a, b) => a.price - b.price);
    case SortTypes.DescendingOrder:
      return offers.sort((a, b) => b.price - a.price);
    case SortTypes.TopRated:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export { capitalizeFirstLetter, filterOffersList, sortOffersByType };
