import type { CardsProps } from 'types/card-props';

const capitalizeFirstLetter = (string = ''): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const filterOffersList = (city: string, offers: CardsProps): CardsProps =>
  offers.filter((offer) => offer.city.name === city);

export { capitalizeFirstLetter, filterOffersList };
