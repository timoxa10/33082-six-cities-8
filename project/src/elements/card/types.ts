/* eslint-disable camelcase */
interface CityCoordinates {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
}

interface HostData {
  avatar_url: string;
  id: number;
  is_pro: boolean;
  name: string;
}

interface LocationInfo {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface CardProps {
  bedrooms: number;
  city: CityCoordinates;
  description: string;
  goods: string[];
  host: HostData;
  id: number;
  images: string[];
  is_favorite: boolean;
  is_premium: boolean;
  location: LocationInfo;
  max_adults: number;
  preview_image: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}
