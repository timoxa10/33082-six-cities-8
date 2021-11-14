import type { OffersProps } from 'types/card-props';

const getOffersByCity = (cityName: string, offers: OffersProps): OffersProps =>
  offers.filter((offer) => offer.city.name === cityName);

export default getOffersByCity;
