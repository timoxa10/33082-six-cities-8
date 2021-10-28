import type { CityCoordinates } from 'types/city-coordinates';
import type { HostData } from 'types/host-data';
import type { LocationInfo } from 'types/location-info';

interface CardProps {
  bedrooms: number;
  city: CityCoordinates;
  description: string;
  goods: string[];
  host: HostData;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationInfo;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

type CardsProps = CardProps[];

export type { CardProps, CardsProps };
